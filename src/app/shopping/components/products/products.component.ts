import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';

import { CategoryService } from '../../../shared/services/category.service';
import { Product } from '../../../shared/models/product';
import { Category } from '../../../shared/models/category';
import { ProductService } from '../../../shared/services/product.service';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  categories: Category[];
  subscriptions: Subscription[] = [];

  filter: any = {
    isOrderedByPriceAsc: null,
    query: '',
    category: ''
  }

  constructor(private productService: ProductService,
              private categoryService: CategoryService) { }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  private loadProducts() {
    let subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
    this.subscriptions.push(subscription);
  }

  private loadCategories() {
    let subscription = this.categoryService.getAll()
      .subscribe(categories => this.categories = categories);
    this.subscriptions.push(subscription);
  }

  resetFilters() {
    this.filter.isOrderedByPriceAsc = null;
    this.filter.query = '';
    this.filter.category = '';
    this.applyFiltering();
  }

  filterByCategory(category) { 
    this.filter.category = category; 
    this.applyFiltering();
  }

  orderByPriceAsc() {
    this.filter.isOrderedByPriceAsc = true;
    this.applyFiltering();
  }

  orderByPriceDesc() {
    this.filter.isOrderedByPriceAsc = false;
    this.applyFiltering();
  }

  applyFiltering() {
    this.filteredProducts = this.products;

    this.filteredProducts = _.filter(this.filteredProducts, p => { 
      let title       = p.title.toLowerCase();
      let template    = this.filter.query.toLowerCase();
      let hasTemplate = title.includes(template);
      let hasCategory = p.category === this.filter.category || !this.filter.category;
      return hasTemplate && hasCategory;
    });
    if (this.filter.isOrderedByPriceAsc === null) return;
    let sign = 2 * this.filter.isOrderedByPriceAsc - 1;
    this.filteredProducts = _.sortBy(this.filteredProducts, p => sign * p.price);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
