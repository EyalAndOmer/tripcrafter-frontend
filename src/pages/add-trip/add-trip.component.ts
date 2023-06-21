import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../services/authservice/authservice.service";

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent {
  tripForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.tripForm = this.formBuilder.group({
      name: '',
      places: this.formBuilder.array([])
    });
  }

  ngOnInit() {
    this.tripForm = this.formBuilder.group({
      name: ['', Validators.required],
      places: this.formBuilder.array([])
    });
    this.addPlace();
  }

  get places(): FormArray {
    return this.tripForm.get('places') as FormArray;
  }

  addPlace() {
    const place = this.formBuilder.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      description: ''
    });
    this.places.push(place);
  }

  deletePlace(index: number) {
    this.places.removeAt(index);
  }

  navigateToMap() {
    this.router.navigate(['add_place'])
  }

  createTrip() {
    if (this.tripForm.valid) {
      const tripName = this.tripForm.get('name')?.value;
      const tripPlaces = this.tripForm.get('places')?.value;

      console.log({
        name: tripName,
        places: tripPlaces,
        userId: this.authService.user.id
      })
    }
  }
}
