import { RouterModule } from '@angular/router';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ToastrModule } from 'ngx-toastr';

import { BsStepperComponent } from './components/bs-stepper/bs-stepper.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { FeatureTypeService } from './services/feature-type.service';
import { ProductService } from './services/product.service';
import { UserService } from './services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    NgxSliderModule,
    SortableModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forChild([])
  ],
  declarations: [
    ProductCardComponent,
    SpinnerComponent,
    BsStepperComponent
  ],
  exports: [
    ProductCardComponent,
    SpinnerComponent,
    BsStepperComponent,
    CommonModule,
    FormsModule,
    CustomFormsModule,
    NgbModule,
    NgxSliderModule,
    SortableModule,
    ToastrModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    UserService,
    ProductService,
    FeatureTypeService,
    CategoryService
  ]
})
export class SharedModule { }
