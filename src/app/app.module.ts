import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '../components/navbar/navbar.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatLegacyListModule} from "@angular/material/legacy-list";
import {MatLineModule, MatRippleModule} from "@angular/material/core";
import {MatGridListModule} from "@angular/material/grid-list";
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import {AppRoutingModule} from "./app-routing.module";
import { ContainerComponent } from '../components/container/container.component';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from '../pages/home/home.component';
import { NotfoundComponent } from '../pages/notfound/notfound.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MapComponent } from '../components/map/map.component';
import { MapSearchComponent } from '../components/map-search/map-search.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AddAttractionComponent } from '../pages/add-attraction/add-attraction.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AddTripComponent } from '../pages/add-trip/add-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ContainerComponent,
    DashboardComponent,
    HomeComponent,
    NotfoundComponent,
    MapComponent,
    MapSearchComponent,
    AddAttractionComponent,
    FooterComponent,
    AddTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatLineModule,
    MatLegacyListModule,
    MatRippleModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    LeafletModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
