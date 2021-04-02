import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SortableModule } from 'ngx-bootstrap/sortable';

import { SharedModule } from '../shared/shared.module';
import { DialogComponent } from './recommend-product/dialog/dialog.component';
import {
  DisplayRecommendedProductsComponent,
} from './recommend-product/display-recommended-products/display-recommended-products.component';
import { RecommendProductComponent } from './recommend-product/recommend-product.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    NgxSliderModule,
    SortableModule,
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
