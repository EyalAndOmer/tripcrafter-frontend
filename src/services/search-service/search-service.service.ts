import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of, tap} from "rxjs";
import {Feature, Place, SearchResponse} from "../../interfaces/SearchResponse";

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor(private http: HttpClient) {}

  search(query: string): Observable<Place[]> {
    if (query !== '') {
      return this.http.get<SearchResponse>(`https://api.maptiler.com/geocoding/${query}.json?key=1Tz0tr8brIx8i4ESpVep`)
        .pipe(
          map((response: SearchResponse) => {
            return response.features.map((feature: Feature) => ({
              coordinates: feature.geometry.coordinates,
              placeName: feature.place_name,
              text: feature.text
            }));
          })
        );
    } else {
      return of([])
    }
  }
}
