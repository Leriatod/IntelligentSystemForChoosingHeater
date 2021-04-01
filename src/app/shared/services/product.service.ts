import { Product } from '../models/product';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products').snapshotChanges().pipe(
      map(changes => changes.map( (c: any) => 
        ( { key: c.payload.key, ...c.payload.val() } as Product) ) 
      )
    );
  }

  get(productId: string): Observable<Product> {
    return this.db.object<Product>('/products/' + productId).valueChanges();
  }

  update(productId: string, product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(productId: string) {
    return this.db.object('/products/' + productId).remove();
  }
}
