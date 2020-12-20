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
  
  allProducts:      any[] = [];
  filteredProducts: any[] = [];
  subscription:   Subscription;

  filter: any = {
    pageSize: this.PAGE_SIZE,
    page: 1
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.allProducts = products;
        this.filteredProducts = _.take(products, this.PAGE_SIZE);
      });
  }

  onPageChange() {
    this.applyFiltering();
  }

  private applyFiltering() {
    this.filteredProducts = this.allProducts;
    this.applyPagining();
  }

  private applyPagining() {
    var startIndex = (this.filter.page - 1) * this.PAGE_SIZE;
    this.filteredProducts = _.rest(this.filteredProducts, startIndex);
    this.filteredProducts = _.take(this.filteredProducts, this.PAGE_SIZE);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
