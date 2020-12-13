import { Component } from '@angular/core';
import { AuthService } from './../auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isExpanded = false;

  constructor(public auth: AuthService) { }

  logout() {
    this.auth.logout();
  }


  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
