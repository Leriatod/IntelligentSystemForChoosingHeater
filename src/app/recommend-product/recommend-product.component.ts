import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import * as _ from 'underscore';
import { ProductService } from './../product.service';


@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.scss']
})
export class RecommendProductComponent implements OnInit, OnDestroy {
  currentStep = 0;
  stepNames = ["Діалог", "Розрахунок Потужності", "Рекомендовані Товари"];

  query: { product: Product, matchingFeaturesNumber: number }[] = [];
  recommendedProducts: Product[] = [];

  filter: any = {
    powerRange: null,
    features: {}
  };

  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        products.forEach(p => this.query.push( { product: p, matchingFeaturesNumber: 0 } ) );
      });
  }

  onStepChanged(stepNumber) { 
    this.currentStep = stepNumber; 
    if (this.currentStep < this.stepNames.length - 1) return;  

    this.sortProductsByMatchingFeaturesDesc();
    this.setProductsWithinPowerRange();
  }

  onFeatureChanged(selectedFeatures) {
    this.filter.features = selectedFeatures;
  }

  onPowerRangeChanged(powerRange) {
    this.filter.powerRange = powerRange;
  }

  private sortProductsByMatchingFeaturesDesc() {
    this.query.forEach(item => {
      var product = item.product;
      var counter = 0;

      for (var featureId in this.filter.features) {
        var productHasFeature = product.features.hasOwnProperty(featureId);
        if (productHasFeature) counter++;
      }
      item.matchingFeaturesNumber = counter;
    });
    this.query = _.sortBy(this.query, item => -1 * item.matchingFeaturesNumber);
  }

  private setProductsWithinPowerRange() {
    this.recommendedProducts = _.filter(this.query, item => {
      if (!this.filter.powerRange) return true;

      var power = item.product.power;
      var minPower = this.filter.powerRange.minPower;
      var maxPower = this.filter.powerRange.maxPower;
      var powerIsWithinRange = power >= minPower && power <= maxPower;
      return powerIsWithinRange;
    }).map(item => item.product);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
