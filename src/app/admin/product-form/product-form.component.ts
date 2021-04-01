import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

import { CategoryService } from '../../shared/services/category.service';
import { FeatureTypeService } from '../../shared/services/feature-type.service';
import { Category } from '../../shared/models/category';
import { FeatureType } from '../../shared/models/feature-type';


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
  categories: Category[];
  subscriptions: Subscription[] = [];

  constructor(private productService: ProductService,
              private featureTypeService: FeatureTypeService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.loadFeatureTypes();
    this.loadCategories();
    this.loadProductById();
  }

  private loadFeatureTypes() {
    let subscription = this.featureTypeService.getAll()
      .subscribe(featureTypes => this.featureTypes = featureTypes);
    this.subscriptions.push(subscription);
  }

  private loadCategories() {
    let subscription = this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
    this.subscriptions.push(subscription);
  }

  private loadProductById() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) return;
    this.isProductLoading = true; 

    let subscription = this.productService.get(this.id).subscribe(product => {
      if (!product) {
        this.navigateToAdminProducts();
        return;
      }
      product.features = product.features || {};
      this.product = product;
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

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
