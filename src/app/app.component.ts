import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../services/authservice/authservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  title = 'tripcrafter-frontend';

  constructor(private authService: AuthService, private router: Router) {}

  // @HostListener('window:beforeunload', ['$event'])
  // onWindowUnload(event: Event) {
  //   this.authService.removeToken();
  // }
}
