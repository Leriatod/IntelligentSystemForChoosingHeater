import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { ProductService } from './../product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: any = {};
  subscription: Subscription = new Subscription();
  id : string;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) return;
    
    this.subscription = this.productService.get(this.id).pipe(
      take(1)
    ).subscribe(p => this.product = p);
  }

  save() {
    if (this.id) {
      this.productService.update(this.id, this.product);
    } else {
      this.productService.create(this.product);
    }
    this.router.navigate(['/admin/products']);
    this.toastr.success("Товар успішно збережено!", "Оновлення Бази Даних");
  }

  delete() {
    if (!confirm(`Ви впевнені, що хочете видалити продукт "${this.product.title}".`)) return;
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
    this.toastr.success("Товар успішно видалено!", "Оновлення Бази Даних");
  }
}
