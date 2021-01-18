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
  featureTypes: any;
  allProducts: Product[];
  features = {};
  query: { product: Product, matchingFeaturesNumber: number }[];

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
        this.allProducts = products;
        this.query = [];
        products.forEach(p => this.query.push( { product: p, matchingFeaturesNumber: 0 } ) );
      });
    this.subscriptions.push(subscription);
  }

  sortProductsByMatchingFeaturesDesc() {
    for (let i = 0; i < this.query.length; i++) {
      var counter = 0;
      for (var featureKey in this.features) {
        var hasFeature = this.query[i].product.features.hasOwnProperty(featureKey);
        if (hasFeature) counter++;
      }
      this.query[i].matchingFeaturesNumber = counter;
    } 
    this.query = _.sortBy(this.query, item => -1 * item.matchingFeaturesNumber);

    console.log(this.query);
  }

  onRadioButtonClick(featureTypeKey) {
    var radioButtons = document.getElementsByName(featureTypeKey);
    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.features[radio.id] = radio.value; 
      } else {
        delete this.features[radio.id];
      }
    });
  }

  onCheckBoxClick(featureKey) {
    if (this.features[featureKey]) {
      delete this.features[featureKey];
    } else {
      this.features[featureKey] = true;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
