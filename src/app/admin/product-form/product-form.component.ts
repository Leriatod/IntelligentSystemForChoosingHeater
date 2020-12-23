import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: Product = { title: '', price: null, imageUrl: '', description: '' };
  isProductLoading = false;
  id: string;

  constructor(private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) return;
    
    this.isProductLoading = true;
    
    this.productService.get(this.id).pipe(
      take(1)
    ).subscribe(product => {
      if (!product) {
        this.navigateToAdminProducts();
        return;
      } 
      this.product = product;
      this.isProductLoading = false;
    });
  }

  save() {
    if (this.id) {
      this.productService.update(this.id, this.product);
    } else {
      this.productService.create(this.product);
    }
    this.navigateToAdminProducts();
    this.toastr.success("Товар успішно збережено!", "Оновлення Бази Даних");
  }

  delete() {
    if (!confirm(`Ви впевнені, що хочете видалити продукт "${this.product.title}".`)) return;
    this.productService.delete(this.id);
    this.navigateToAdminProducts();
    this.toastr.success("Товар успішно видалено!", "Оновлення Бази Даних");
  }

  private navigateToAdminProducts() {
    this.router.navigate(['/admin/products']);
  }
}
