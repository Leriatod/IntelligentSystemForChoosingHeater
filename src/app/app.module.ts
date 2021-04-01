import { SharedModule } from './shared/shared.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AdminAuthGuard as AdminAuthGuard } from './admin-auth-guard.service';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { SelectingFeaturesComponent } from './admin/product-form/selecting-features/selecting-features.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductsComponent } from './products/products.component';
import { DialogComponent } from './recommend-product/dialog/dialog.component';
import {
  DisplayRecommendedProductsComponent,
} from './recommend-product/display-recommended-products/display-recommended-products.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';
import { AuthGuard as AuthGuard } from './shared/services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductsComponent,
    MyOrdersComponent,

    ProductViewComponent,
    
    RecommendProductComponent,
    
    DialogComponent,
    DisplayRecommendedProductsComponent,
    SelectingFeaturesComponent
  ],
  imports: [
    SharedModule,

    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    FormsModule,
    CustomFormsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    NgbModule,
    SortableModule.forRoot(),
    ToastrModule.forRoot(),
    NgxSliderModule,

    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'login', component: LoginComponent },
      { path: 'products/:id', component: ProductViewComponent },
      { path: 'recommend-product', component: RecommendProductComponent },

      { path: 'my-orders', component: MyOrdersComponent, canActivate: [AuthGuard] },

      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
      { path: 'admin/products/edit/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminAuthGuard] },
    ])
  ],
  providers: [
    AdminAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
