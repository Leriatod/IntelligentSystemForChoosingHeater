import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { Product } from '../shared/models/product';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Product = new Product();
  isProductLoading = true;
  activeTabId = 1;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private router: Router) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');

    this.productService.get(id).pipe(
      take(1)
    ).subscribe(product => { 
      if (!product) {
        this.router.navigate(['/']);
        return;
      }
      this.product = product;
      this.isProductLoading = false;
    });
  }

}
