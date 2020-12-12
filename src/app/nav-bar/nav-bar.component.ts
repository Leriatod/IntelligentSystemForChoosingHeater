import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isExpanded = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

}
