import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  product: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  save() {
    console.log(this.product);
  }
}
