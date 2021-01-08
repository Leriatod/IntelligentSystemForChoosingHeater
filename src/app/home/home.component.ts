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
  subscription: Subscription;
  isOrderedByPriceAsc: boolean = null;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => this.products = products);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  orderByPriceAsc() {
    this.products = _.sortBy(this.products, p => p.price);
    this.isOrderedByPriceAsc = true;
  }

  orderByPriceDesc() {
    this.orderByPriceAsc();
    this.products = this.products.reverse();
    this.isOrderedByPriceAsc = false;
  }
}
