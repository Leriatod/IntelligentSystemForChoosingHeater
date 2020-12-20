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
  private readonly TITLE = 'title';
  private readonly PRICE = 'price';

  private allProducts: any[] = [];

  filteredProducts:  any[] = [];
  displayedProducts: any[] = [];
  subscription:   Subscription;

  filter = {
    pageSize: this.PAGE_SIZE,
    page: 1,
    query: '',
    orderBy: '',
    orderByAsc: false,
  }

  columns = [
    { name: '',      cssClass: "col-3", key: '',      isSortable: false },
    { name: 'Товар', cssClass: "col-6", key: this.TITLE, isSortable: true  },
    { name: 'Ціна',  cssClass: "col-3", key: this.PRICE, isSortable: true  },
  ];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
        this.allProducts = products;
        this.filteredProducts = products;
        this.displayedProducts = _.take(products, this.PAGE_SIZE);
      });
  }

  orderBy(column: string) {
    if (this.filter.orderBy != column) {
      this.filter.orderBy    = column;
      this.filter.orderByAsc = false;
    }
    this.filter.orderByAsc = !this.filter.orderByAsc;
    this.applyFiltering();
  }

  onQueryChange() {
    this.filter.page = 1;
    this.applyFiltering();
  }

  onPageChange() {
    this.applyFiltering();
  }

  private applyFiltering() {
    this.filteredProducts = this.allProducts;
    this.applySearching();
    this.applyOrdering();
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

  private applyOrdering() {
    if (this.filter.orderBy === this.TITLE) {
      this.filteredProducts = _.sortBy(this.filteredProducts, p => p.title);
    } else if (this.filter.orderBy === this.PRICE) {
      this.filteredProducts = _.sortBy(this.filteredProducts, p => p.price);
    }
    if (!this.filter.orderByAsc) 
      this.filteredProducts = this.filteredProducts.reverse();
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
