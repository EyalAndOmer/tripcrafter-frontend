import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import {RouteGuard} from "../components/route-guard/route-guard";
import {DashboardComponent} from "../pages/dashboard/dashboard.component";
import {HomeComponent} from "../pages/home/home.component";
import {NotfoundComponent} from "../pages/notfound/notfound.component";
import {LoggedInGuard} from "../components/loggedin-guard/logged-in-guard.guard";
import {AddAttractionComponent} from "../pages/add-attraction/add-attraction.component";
import {AddTripComponent} from "../pages/add-trip/add-trip.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [RouteGuard], data: { requiredRole: 'user'} },
  { path: 'home', component: HomeComponent, canActivate: [RouteGuard], data: { requiredRole: 'user'} },
  { path: 'add_place', component: AddAttractionComponent, canActivate: [RouteGuard], data: { requiredRole: 'user' }},
  { path: 'add_trip', component: AddTripComponent, canActivate: [RouteGuard], data: { requiredRole: 'user' }},
  { path: '404', component: NotfoundComponent, canActivate: [RouteGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
