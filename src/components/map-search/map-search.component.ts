import {Component, EventEmitter, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, finalize, switchMap, tap} from "rxjs";
import {FormControl} from "@angular/forms";
import {SearchServiceService} from "../../services/search-service/search-service.service";
import {Place, Points} from "../../interfaces/SearchResponse";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-map-search',
  templateUrl: './map-search.component.html',
  styleUrls: ['./map-search.component.scss'],
})

export class MapSearchComponent {
  searchControl = new FormControl();
  filteredResults: Place[] = [];
  isLoading: boolean = false;
  showOptions: boolean = false;
  city!: string
  showWindow: boolean = false;

  @Output() selectedCity = new EventEmitter<Place>();
  @Output() pointsOfInterests = new EventEmitter<Points>();

  constructor(private searchService: SearchServiceService, private http: HttpClient) {
  }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => this.isLoading = true),
        switchMap(() => this.searchService.search(this.searchControl.value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      )
      .subscribe((value) => {
        this.filteredResults = value
      });
  }


  onResultSelect(result: Place) {
    this.selectedCity.emit(result);
    this.city = result.text;
    this.showOptions = true;
  }

  loadTouristAttractions() {
    const query = `https://overpass-api.de/api/interpreter?data=[out:json][timeout:25];area[name="${this.city}"]->.city;(node(area.city)["name"]["tourism"]["tourism"!~"^(hotel|apartment|guest_house|hostel|chalet|camp_site)$"]["amenity"!="restaurant|hotel"];node(area.city)["name"]["historic"];way(area.city)["name"]["tourism"]["tourism"!~"^(hotel|apartment|guest_house|hostel|chalet|camp_site)$"]["amenity"!="restaurant|hotel"];way(area.city)["name"]["historic"]; rel(area.city)["name"]["tourism"]["tourism"!~"^(hotel|apartment|guest_house|hostel|chalet|camp_site)$"]["amenity"!="restaurant|hotel"];rel(area.city)["historic"];);(._;>;);out body;`;
    const apiUrl = 'https://overpass-api.de/api/interpreter?data=' + query;

    this.makeRequest(query);
  }

  loadRestaurants() {
    const query = `[out:json][timeout:25];area[name="${this.city}"]->.searchArea;(  node(area.searchArea)["name"]["amenity"~"cafe|restaurant|fast_food|food_court|pub|bar|ice_cream|bakery"];  way(area.searchArea)["name"]["amenity"~"cafe|restaurant|fast_food|food_court|pub|bar|ice_cream|bakery"];  relation(area.searchArea)["name"]["amenity"~"cafe|restaurant|fast_food|food_court|pub|bar|ice_cream|bakery"];);out center;(._;>;);out body;`
    const apiUrl = 'https://overpass-api.de/api/interpreter?data=' + query;

    this.makeRequest(apiUrl);
  }

  loadHotels() {
    const query = `[out:json][timeout:25];area[name="${this.city}"]->.searchArea;(  node(area.searchArea)["name"]["tourism"~"hotel|motel|guest_house|hostel|camp_site|caravan_site"];  way(area.searchArea)["name"]["tourism"~"hotel|motel|guest_house|hostel|camp_site|caravan_site"];  relation(area.searchArea)["name"]["tourism"~"hotel|motel|guest_house|hostel|camp_site|caravan_site"];);out center;(._;>;);out body;`
    const apiUrl = 'https://overpass-api.de/api/interpreter?data=' + query;

    this.makeRequest(apiUrl);
  }

  loadFunPlaces() {
    const query = `[out:json][timeout:25];area[name="${this.city}"]->.searchArea;(  node(area.searchArea)["name"]["amenity"~"cinema|theatre|nightclub|casino|amusement_arcade|bowling_alley|aquarium|zoo|park"];  way(area.searchArea)["name"]["amenity"~"cinema|theatre|nightclub|casino|amusement_arcade|bowling_alley|aquarium|zoo|park"];  relation(area.searchArea)["name"]["amenity"~"cinema|theatre|nightclub|casino|amusement_arcade|bowling_alley|aquarium|zoo|park"];);out center;(._;>;);out body;`
    const apiUrl = 'https://overpass-api.de/api/interpreter?data=' + query;

    this.makeRequest(apiUrl);
  }

  makeRequest(url: string) {
    this.http.get(url)
      .subscribe((response: any) => {
        this.pointsOfInterests.emit(response);
      });
  }
}
