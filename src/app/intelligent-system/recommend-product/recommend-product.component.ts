import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import * as _ from 'underscore';
import { FeatureTypeService } from '../../shared/services/feature-type.service';
import { FeatureType } from '../../shared/models/feature-type';
import { ProductService } from '../../shared/services/product.service';


@Component({
  selector: 'app-recommend-product',
  templateUrl: './recommend-product.component.html',
  styleUrls: ['./recommend-product.component.scss']
})
export class RecommendProductComponent implements OnInit, OnDestroy {
  private readonly POWER_PER_SQUARE_METER = 0.1; // in kW

  currentStep = 0;
  stepNames = ["Діалог", "Рекомендовані Товари"];

  query: { product: Product, score: number }[] = [];
  recommendedProducts: Product[] = [];

  filter: any = {
    productsNumberToDisplay: 10,
    powerPerSquareMeter: this.POWER_PER_SQUARE_METER,
    roomArea: 0,
    maxPrice: 2500,
    features: []
  };

  featureTypes: FeatureType[];
  subscriptions: Subscription[] = [];

  constructor(private productService: ProductService,
              private featureTypeService: FeatureTypeService) { }

  ngOnInit() {
    this.loadProducts();
    this.loadFeatureTypes();
  }

  private loadProducts() {
    let subscription = this.productService.getAll()
      .subscribe(products => {
        products.forEach(p => this.query.push( { product: p, score: 0 } ) );
      });
    this.subscriptions.push(subscription);
  }

  private loadFeatureTypes() {
    let subscription = this.featureTypeService.getAll()
      .subscribe(featureTypes => this.featureTypes = featureTypes);
    this.subscriptions.push(subscription);
  }

  onStepChanged(stepNumber) { 
    this.currentStep = stepNumber; 
    if (this.currentStep < this.stepNames.length - 1) return;  

    this.sortProductsByMatchingFeaturesDesc();
    this.filterProductsByMinPower();
    this.filterProductsByMaxPrice();
  }

  private sortProductsByMatchingFeaturesDesc() {
    this.query.forEach(item => {
      let product = item.product;
      let totalScore = 0;

      this.filter.features.forEach(feature => {
        let productHasFeature = product.features.hasOwnProperty(feature.key);
        if (productHasFeature) totalScore += feature.coeff;
      });
      item.score = totalScore;
    });
    this.query = _.sortBy(this.query, item => -1 * item.score);
  }

  private filterProductsByMinPower() {
    let minPower = this.filter.roomArea * this.POWER_PER_SQUARE_METER;
    this.recommendedProducts = _.filter(this.query, item => item.product.power >= minPower)
      .map(item => item.product);
  }

  private filterProductsByMaxPrice() {
    this.recommendedProducts = _.filter(this.recommendedProducts, 
      p => p.price <= this.filter.maxPrice);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());   
  }
}
