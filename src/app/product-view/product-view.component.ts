import { take } from 'rxjs/operators';
import { ProductService } from 'src/app/product.service';
import { ActivatedRoute } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: any = {};
  activeTabId = 1;

  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');

    this.productService.get(id).pipe(
      take(1)
    ).subscribe(product => { 
      this.product = product;
      //this.product.description = this.product.description.replace(/(?:\r\n|\r|\n)/g, '<br>');
    });
  }

}
