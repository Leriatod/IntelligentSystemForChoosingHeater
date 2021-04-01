import { Component, OnInit } from '@angular/core';
import { AppUser } from '../shared/models/app-user';
import { AuthService } from './../auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isExpanded = false;
  appUser: AppUser;

  constructor(private auth: AuthService) { }
  
  ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
