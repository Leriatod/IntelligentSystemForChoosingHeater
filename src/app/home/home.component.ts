import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';

import { CategoryService } from '../category.service';
import { Product } from '../models/product';
import { Category } from './../models/category';
import { ProductService } from './../product.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
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
    var subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
    this.subscriptions.push(subscription);
  }

  private loadCategories() {
    var subscription = this.categoryService.getAll()
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
      var title       = p.title.toLowerCase();
      var template    = this.filter.query.toLowerCase();
      var hasTemplate = title.includes(template);
      var hasCategory = p.category === this.filter.category || !this.filter.category;
      return hasTemplate && hasCategory;
    });
    if (this.filter.isOrderedByPriceAsc === null) return;
    var sign = 2 * this.filter.isOrderedByPriceAsc - 1;
    this.filteredProducts = _.sortBy(this.filteredProducts, p => sign * p.price);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
