import { FeatureType } from './../models/feature-type';
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
  currentStep = 0;
  stepNames = ["Діалог", "Розрахунок Потужності", "Рекомендовані Товари"];

  query: { product: Product, matchingFeaturesNumber: number }[] = [];
  recommendedProducts: Product[] = [];
  filter: any = {
    powerRange: null,
    features: {}
  };

  featureTypes: FeatureType[];
  subscriptions: Subscription[] = [];

  radioButtonsOptionsForPowerEstimation = [
    { id: "square1", label: "5-6 кв. м.",   value: { minPower: 0.5,  maxPower: 0.75 } },
    { id: "square2", label: "7-9 кв. м.",   value: { minPower: 0.75, maxPower: 1    } },
    { id: "square3", label: "10-12 кв. м.", value: { minPower: 1,    maxPower: 1.25 } },
    { id: "square4", label: "12-14 кв. м.", value: { minPower: 1.25, maxPower: 1.5  } },
    { id: "square5", label: "15-17 кв. м.", value: { minPower: 1.5,  maxPower: 1.75 } },
    { id: "square6", label: "18-19 кв. м.", value: { minPower: 1.75, maxPower: 2    } },
    { id: "square7", label: "20-23 кв. м.", value: { minPower: 2,    maxPower: 2.5  } },
    { id: "square8", label: "24-27 кв. м.", value: { minPower: 2.5,  maxPower: 2.75 } },
    { id: "square0", label: "Не обирати",   value: null }
  ];

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
        products.forEach(p => this.query.push( { product: p, matchingFeaturesNumber: 0 } ) );
      });
    this.subscriptions.push(subscription);
  }

  onRadioButtonFeatureSelect(featureTypeId: string, feature) {
    var radioButtons = document.getElementsByName(featureTypeId);

    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.filter.features[radio.id] = feature.value;
      } else {
        delete this.filter.features[radio.id];
      }
    });
  }

  onCheckBoxFeatureSelect(feature) {
    if (this.filter.features[feature.key]) {
      delete this.filter.features[feature.key];
    } else {
      this.filter.features[feature.key] = feature.value;
    }
  }


  onStepChanges(stepNumber) { 
    this.currentStep = stepNumber; 
    if (this.currentStep < 2) return;  

    this.sortProductsByMatchingFeaturesDesc();
    this.setProductsWithinPowerRange();
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
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
