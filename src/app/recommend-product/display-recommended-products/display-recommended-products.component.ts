import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'display-recommended-products',
  templateUrl: './display-recommended-products.component.html',
  styleUrls: ['./display-recommended-products.component.scss']
})
export class DisplayRecommendedProductsComponent {
  @Input() sortedProductsByMatchingFeaturesDesc: Product[] = [];
  @Input() selectedFeatures = [];
  @Input() productsNumberToDisplay = 5;
}
