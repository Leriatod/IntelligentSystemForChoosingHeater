import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  
  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router) {}

  ngOnInit() {
    this.subscription = this.auth.user$.subscribe(user => {
      if (!user) return;
      
      this.userService.save(user);

      let returnUrl = localStorage.getItem('returnUrl');
      
      if (!returnUrl) return;
      
      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(returnUrl);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
