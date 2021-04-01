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

import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { CoreModule } from './core/core.module';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ProductsComponent } from './products/products.component';
import { DialogComponent } from './recommend-product/dialog/dialog.component';
import {
  DisplayRecommendedProductsComponent,
} from './recommend-product/display-recommended-products/display-recommended-products.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';
import { AuthGuard as AuthGuard } from './shared/services/auth-guard.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    

    ProductsComponent,
    MyOrdersComponent,

    ProductViewComponent,

    RecommendProductComponent,

    DialogComponent,
    DisplayRecommendedProductsComponent,
  ],
  imports: [
    SharedModule,
    AdminModule,
    CoreModule,
    
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

      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
