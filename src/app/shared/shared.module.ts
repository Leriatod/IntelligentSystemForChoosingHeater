import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

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
    CommonModule
  ],
  declarations: [
    ProductCardComponent,
    SpinnerComponent,
    BsStepperComponent
  ],
  exports: [
    ProductCardComponent,
    SpinnerComponent,
    BsStepperComponent
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
