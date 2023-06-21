import {ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  Map as LeafletMap,
  Control,
  DomUtil,
  ZoomAnimEvent,
  Layer,
  MapOptions,
  tileLayer,
  latLng,
  LeafletEvent,
  marker, latLngBounds, Marker, icon, LeafletMouseEvent, Circle, Polyline, LatLngExpression, Polygon
} from 'leaflet';
import {Place, PointOfInterest} from "../../interfaces/SearchResponse";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {FormControl} from "@angular/forms";
import {TripServiceService} from "../../services/trip-service/trip-service.service";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss',],
  animations: [
    trigger('floatInFromLeft', [
      state('void', style({ left: '-300px' })), // Initial position outside the viewport
      state('*', style({ left: '0' })), // Final position at 0px from the left
      transition(':enter', animate('250ms ease-in')),
      transition(':leave', animate('250ms ease-out'))
    ])
  ]
})

export class MapComponent implements OnDestroy {

  @Output() map$: EventEmitter<LeafletMap> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: MapOptions= {
    layers:[tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      opacity: 0.7,
      maxZoom: 19,
      minZoom: 3,
      detectRetina: true,
      noWrap: true,
      attribution: '&copy; <a href="http://www.maptilesapi.com/">MapTiles API</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })],
    zoom:1,
    center:latLng(0,0)
  };


  shownPoints: Circle[] = [];
  shownWays: Polygon[] = [];
  public map!: LeafletMap;
  showWindow: boolean = false;
  public zoom: number = 1;
  currentSelected: Polygon | Circle | null = null;
  data: PointOfInterest[] = [];
  filteredData: any[] = []; // Array to store filtered data
  myControl = new FormControl();

  constructor(private tripService: TripServiceService) {
    this.filteredData = this.data; // Initialize filteredData with all elements
    this.myControl.valueChanges.subscribe(value => {
      this.filteredData = this.filterData(value); // Update filteredData based on input value
    });
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners();
    this.map.remove();
  };

  onMapReady(map: LeafletMap) {
    this.map = map;
    this.map$.emit(map);
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);

    const control = map.zoomControl;
    this.map.addControl(control.setPosition("bottomright"));


    // icon fix
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;

    const southWest = latLng(-90, -180);
    const northEast = latLng(90, 180);
    const bounds = latLngBounds(southWest, northEast);

    this.map.setMaxBounds(bounds);
  }

  onMapZoomEnd(e: LeafletEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  onCoordinatesSelected(place: Place) {
    const [longitude, latitude] = place.coordinates;
    this.map.setView([latitude, longitude], 12);
  }

  onAttractionsSelect(elements: PointOfInterest[]) {
    for (const element of this.shownWays) {
      element.off()
      element.remove()
    }

    for (const element of this.shownPoints) {
      element.off()
      element.remove()
    }

    this.data = elements;


    const circleRadius = 5;

    let wayNodesMap: Map<number, PointOfInterest> = new Map<number, PointOfInterest>();

    for (const element of elements) {
      switch (element.type) {
        case "node":
          if (element.tags !== undefined) {
            const circle = new Circle([element.lat, element.lon], {
              radius: circleRadius,
              color: 'red',
              fillColor: 'red'
            });
            circle.addTo(this.map);
            this.shownPoints.push(circle);

            circle.on('click', (event: LeafletMouseEvent) => {
              if (this.currentSelected) {
                this.currentSelected.unbindPopup();
                this.currentSelected.setStyle({color: 'red', fillColor: 'red'});
              }
              circle.setStyle({ color: 'orange', fillColor: 'orange' });
              this.currentSelected = circle;

              const tooltipContent=
                `
                  <div>
                    <h3>Meno: <span>${ element.tags?.name }</span></h3>
                  </div>

                  <div>
                    <button class="btn btn-primary">Pridat do vyletu</button>
                  </div>
                `;

              circle.bindPopup(tooltipContent, {
                closeButton: true,
                autoClose: false,
                closeOnClick: true
              }).openPopup();
            });

          } else {
            wayNodesMap.set(element.id, element);
          }
          break;
        case "way":
          if (element.nodes !== undefined) {
            const selectedNodes: PointOfInterest[] = element.nodes.map(nodeId => wayNodesMap.get(nodeId)).filter((node): node is PointOfInterest => !!node);
            const coordinates: LatLngExpression[] = selectedNodes.map(node => [node.lat, node.lon]);
            const shape = new Polygon(coordinates, {color: 'red', fillColor: 'red'});
            shape.addTo(this.map);
            this.shownWays.push(shape);

            shape.on('click', (event: LeafletMouseEvent) => {
              if (this.currentSelected) {
                this.currentSelected.unbindPopup();
                this.currentSelected.setStyle({color: 'red', fillColor: 'red'});
              }
              shape.setStyle({ color: 'orange', fillColor: 'orange' });
              this.currentSelected = shape

              const tooltipContent=
                `
                  <div>
                    <h3>Meno: <span>${ element.tags?.name }</span></h3>
                  </div>

                  <div>
                    <button (click)="this.addPlace()" class="btn btn-primary">Pridat do vyletu</button>
                  </div>
                `;
              shape.bindPopup(tooltipContent, {
                closeButton: true,
                autoClose: false,
                closeOnClick: true
              }).openPopup();
            });
          }
          break;
      }
    }
    this.showWindow = true;
  }

  zoomToSelected(element: PointOfInterest) {
    this.myControl.setValue('');
    if (element.type === "way") {
      let firstNodeData = this.data.filter(el => element.nodes && el.id === element.nodes[0]);
      this.map.setView([firstNodeData[0].lat, firstNodeData[0].lon], 19);
    } else if (element.type === "relation") {
      let firstWayId = element.members && element.members[0].ref;
      let firstWay = this.data.filter(el => el.id === firstWayId);
      let firstNodeData = this.data.filter(el => firstWay[0].nodes && el.id === firstWay[0].nodes[0]);

      this.map.setView([firstNodeData[0].lat, firstNodeData[0].lon], 19);
    } else {
      this.map.setView([element.lat, element.lon], 19);
    }
  }

  addPlace() {

  }

  filterData(value: string) {
    return this.data.filter(item => item.tags?.name?.toLowerCase().includes(value.toLowerCase()));
  }
}
