import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable, OnInit } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth) { 
    this.user$ = afAuth.authState;
  }
  
  login() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }
}
