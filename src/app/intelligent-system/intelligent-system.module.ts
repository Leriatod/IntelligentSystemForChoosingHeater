import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './recommend-product/dialog/dialog.component';
import {
  DisplayRecommendedProductsComponent,
} from './recommend-product/display-recommended-products/display-recommended-products.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'recommend-product', component: RecommendProductComponent },
    ]),
  ],
  declarations: [
    RecommendProductComponent,
    DialogComponent,
    DisplayRecommendedProductsComponent,
  ],
})
export class IntelligentSystemModule {}
