import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([])
  ],
  declarations: [
    NavBarComponent,
    LoginComponent
  ],
  exports: [
    NavBarComponent
  ]
})
export class CoreModule { }
