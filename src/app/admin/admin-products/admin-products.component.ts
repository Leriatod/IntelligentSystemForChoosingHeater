import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  private readonly PAGE_SIZE = 5;
  private allProducts: any[] = [];

  filteredProducts:  any[] = [];
  displayedProducts: any[] = [];
  subscription:   Subscription;

  filter = {
    pageSize: this.PAGE_SIZE,
    page: 1,
    query: ''
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.allProducts = products;
        this.filteredProducts = products;
        this.displayedProducts = _.take(products, this.PAGE_SIZE);
      });
  }

  onQueryChange() {
    this.applyFiltering();
  }

  onPageChange() {
    this.applyFiltering();
  }

  private applyFiltering() {
    this.filteredProducts = this.allProducts;
    this.applySearching();
    this.applyPagining();
  }

  private applySearching() {
    this.filteredProducts = _.filter(this.filteredProducts, p => {
      var title = p.title.toLowerCase();
      var template = this.filter.query.toLowerCase();
      var hasString = title.includes(template);
      return hasString;
    });
  }

  private applyPagining() {
    var startIndex = (this.filter.page - 1) * this.PAGE_SIZE;
    this.displayedProducts = _.rest(this.filteredProducts, startIndex);
    this.displayedProducts = _.take(this.displayedProducts, this.PAGE_SIZE);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
