import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../../services/authservice/authservice.service';
import {roles} from "../../interfaces/User";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class RouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      this.router.navigate(['/login']);
      return false;
    }

    this.authService.fetchUserData().then(response => {
      this.authService.user = response;
      })
      .catch(err => {
        this.authService.removeToken();
        this.router.navigate(['/login']);
      })

    const requiredRole = next.root.data['requiredRole'];

    if (!requiredRole) {
      return true;
    }

    const roleValues: string[] = Object.values(roles);

    if (roleValues.indexOf(requiredRole) > roleValues.indexOf(this.authService.userRole)) {
      this.router.navigate(['/404']);
      return false;
    }

    return true;
  }
}
