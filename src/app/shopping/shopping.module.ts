import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecommendProductComponent } from '../recommend-product/recommend-product.component';
import { AuthGuard } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';

import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { ProductViewComponent } from './components/product-view/product-view.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'products/:id', component: ProductViewComponent },
      { path: 'recommend-product', component: RecommendProductComponent },
      {
        path: 'my-orders',
        component: MyOrdersComponent,
        canActivate: [AuthGuard],
      },
    ])
  ],
  declarations: [
    MyOrdersComponent,
    ProductsComponent,
    ProductViewComponent,
  ]
})
export class ShoppingModule { }
