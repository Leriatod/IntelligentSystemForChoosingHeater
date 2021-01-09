import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];

  subscription: Subscription;
  filter: any = {
    isOrderedByPriceAsc: null,
    query: ''
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.filteredProducts = this.products = products);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  resetFilters() {
    this.filter.isOrderedByPriceAsc = null;
    this.filter.query = '';
    this.onQueryChange();
  }

  onQueryChange() {
    this.filteredProducts = this.products;
    this.filteredProducts = _.filter(this.filteredProducts, p => { 
      var title       = p.title.toLowerCase();
      var template    = this.filter.query.toLowerCase();
      var hasTemplate = title.includes(template);
      return hasTemplate;
    });
  }

  orderByPriceAsc() {
    this.filter.isOrderedByPriceAsc = true;
    this.applyOrderingByPrice();
  }

  orderByPriceDesc() {
    this.filter.isOrderedByPriceAsc = false;
    this.applyOrderingByPrice();
  }

  private applyOrderingByPrice() {
    this.filteredProducts = _.sortBy(this.filteredProducts, p => p.price);
    if (this.filter.isOrderedByPriceAsc) return;
    this.filteredProducts = this.filteredProducts.reverse();
  }
}
