import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isExpanded = false;

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) { }
  ngOnInit() {
    this.user$ = this.afAuth.authState;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.afAuth.signOut();
  }
}
