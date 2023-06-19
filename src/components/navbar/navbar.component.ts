import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDrawer } from '@angular/material/sidenav';
import {AuthService} from "../../services/authservice/authservice.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild(MatDrawer, { static: false }) drawer!: MatDrawer;

  isMobile = false;
  isDrawerOpen = false;

  constructor(private breakpointObserver: BreakpointObserver, public authService: AuthService) {}

  ngOnInit() {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe(result => {
      this.isMobile = result.matches;

      if (this.isDrawerOpen) {
        this.closeDrawer();
      }
    });
  }

  toggleDrawer() {
    if (this.drawer.opened) {
      this.closeDrawer();
    } else {
      this.openDrawer();
    }
  }

  openDrawer() {
    this.drawer.open();
    this.isDrawerOpen = true;
  }

  closeDrawer() {
    this.drawer.close();
    this.isDrawerOpen = false;
  }
}
