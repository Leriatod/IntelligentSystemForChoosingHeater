import { FeatureType } from './../../models/feature-type';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';

import { FeatureTypeService } from './../../feature-type.service';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  product: Product = new Product();
  isProductLoading = false;
  id: string;
  featureTypes: FeatureType[];
  subscriptions: Subscription[] = [];

  constructor(private productService: ProductService,
              private featureTypeService: FeatureTypeService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.loadFeatureTypes();
    this.loadProductById();
  }

  private loadFeatureTypes() {
    var subscription = this.featureTypeService.getAllFeatureTypes()
      .subscribe(featureTypes => this.featureTypes = featureTypes);
    this.subscriptions.push(subscription);
  }

  private loadProductById() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) return;
    
    this.isProductLoading = true;
    
    var subscription = this.productService.get(this.id).subscribe(product => {
      if (!product) {
        this.navigateToAdminProducts();
        return;
      } 
      this.product = product;
      if (!this.product.features) this.product.features = {};
      this.isProductLoading = false;
    });
    this.subscriptions.push(subscription);
  }

  save() {
    if (this.id) {
      this.productService.update(this.id, this.product);
    } else {
      this.productService.create(this.product);
    }
    this.navigateToAdminProducts();
    this.toastr.success("Товар успішно збережено!", "Оновлення Бази Даних");
  }

  delete() {
    if (!confirm(`Ви впевнені, що хочете видалити продукт "${this.product.title}".`)) return;
    this.productService.delete(this.id);
    this.navigateToAdminProducts();
    this.toastr.success("Товар успішно видалено!", "Оновлення Бази Даних");
  }

  private navigateToAdminProducts() {
    this.router.navigate(['/admin/products']);
  }

  onCheckBoxChange(feature) {
    if (this.product.features[feature.key]) {
      delete this.product.features[feature.key];
    } else {
      this.product.features[feature.key] = { name: feature.value.name };
    }
  }

  onRadioButtonClick(featureTypeKey: string, feature) {
    var radioButtons = document.getElementsByName(featureTypeKey);

    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.product.features[radio.id] = { name: feature.value.name };
      } else {
        delete this.product.features[radio.id];
      }
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
