import { Product } from 'src/app/models/product';
import { ProductService } from './../product.service';
import { Subscription } from 'rxjs';
import { FeatureTypeService } from './../feature-type.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.scss']
})
export class RecommendProductComponent implements OnInit, OnDestroy {
  pageNumber = 1;
  query: { product: Product, matchingFeaturesNumber: number }[];
  features = {};
  featureTypes: any;
  subscriptions: Subscription[] = [];

  constructor(private featureTypeService: FeatureTypeService,
              private productService: ProductService) { }

  ngOnInit() {
    this.loadFeatureTypes();
    this.loadProducts();
  }

  private loadFeatureTypes() {
    var subscription = this.featureTypeService.getAllFeatureTypes()
      .subscribe(featureTypes => this.featureTypes = featureTypes);
    this.subscriptions.push(subscription);
  }
  
  private loadProducts() {
    var subscription = this.productService.getAll()
      .subscribe(products => {
        this.query = [];
        products.forEach(p => this.query.push( { product: p, matchingFeaturesNumber: 0 } ) );
      });
    this.subscriptions.push(subscription);
  }

  onRadioButtonClick(featureTypeId: string, feature) {
    var radioButtons = document.getElementsByName(featureTypeId);

    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.features[radio.id] = feature.value;
      } else {
        delete this.features[radio.id];
      }
    });
  }

  onCheckBoxClick(feature) {
    if (this.features[feature.key]) {
      delete this.features[feature.key];
    } else {
      this.features[feature.key] = feature.value;
    }
  }

  sortProductsByMatchingFeaturesDesc() {
    this.query.forEach(item => {
      var product = item.product;
      var counter = 0;

      for (var featureId in this.features) {
        var productHasFeature = product.features.hasOwnProperty(featureId);
        if (productHasFeature) counter++;
      }
      item.matchingFeaturesNumber = counter;
    });
    this.query = _.sortBy(this.query, item => -1 * item.matchingFeaturesNumber);
  }

  checkIfAnyFeatureSelected() {
    return Object.keys(this.features).length > 0;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
