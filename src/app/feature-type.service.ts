import { FeatureType } from './models/feature-type';
import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './models/product';
import { Feature } from './models/feature';

@Injectable({
  providedIn: 'root'
})
export class FeatureTypeService {

  constructor(private db: AngularFireDatabase) { }

  getAllFeatureTypes(): Observable<FeatureType[]> {
    return this.db.list('/feature-types').snapshotChanges().pipe(
      map(changes => changes.map(c => {
        var value: any = c.payload.val();
        return new FeatureType(value.name, value.canSelectManyFeatures, value.features);
      }))
    );
  }
}
