import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private userService: UserService) { }

  canActivate() {
    return this.auth.user$.pipe(
      switchMap(user => this.userService.get(user.uid)),
      map(user => user.isAdmin)
    );
  }

}
