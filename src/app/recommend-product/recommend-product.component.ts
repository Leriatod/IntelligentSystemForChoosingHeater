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

  query: { product: Product, score: number }[] = [];
  recommendedProducts: Product[] = [];

  filter: any = {
    productsNumberToDisplay: 7,
    powerRange: null,
    maxPrice: 2500,
    features: []
  };

  subscription: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        products.forEach(p => this.query.push( { product: p, score: 0 } ) );
      });
  }

  onStepChanged(stepNumber) { 
    this.currentStep = stepNumber; 
    if (this.currentStep < this.stepNames.length - 1) return;  

    this.sortProductsByMatchingFeaturesDesc();
    this.setProductsWithinPowerRange();
    this.filterProductsByMaxPrice();
  }

  private sortProductsByMatchingFeaturesDesc() {
    this.query.forEach(item => {
      var product = item.product;
      var totalScore = 0;

      this.filter.features.forEach(feature => {
        var productHasFeature = product.features.hasOwnProperty(feature.key);
        if (productHasFeature) totalScore += feature.coeff;
      });
      item.score = totalScore;
    });
    this.query = _.sortBy(this.query, item => -1 * item.score);
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

  private filterProductsByMaxPrice() {
    this.recommendedProducts = _.filter(this.recommendedProducts, 
      p => p.price <= this.filter.maxPrice);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
