import { Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: any = {};

  constructor(private productService: ProductService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  save() {
    this.productService.create(this.product);
    this.router.navigate(['/admin/products']);
    this.toastr.success("Товар успішно збережено!", "Оновлення Бази Даних");
  }
}
