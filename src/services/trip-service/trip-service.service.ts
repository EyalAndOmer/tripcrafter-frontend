import {EventEmitter, Injectable, Output} from '@angular/core';
import {PointOfInterest, Points} from "../../interfaces/SearchResponse";

@Injectable({
  providedIn: 'root'
})

export class TripServiceService {
  @Output() selectedPointEmitter = new EventEmitter<PointOfInterest>();
  selectedPlace!: PointOfInterest;

  constructor() {}


  selectPlace(place: PointOfInterest) {
    this.selectedPlace = place;
    this.selectedPointEmitter.emit(this.selectedPlace);
  }

}
