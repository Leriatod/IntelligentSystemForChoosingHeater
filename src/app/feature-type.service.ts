import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureTypeService {

  constructor(private db: AngularFireDatabase) { }

  getAllFeatureTypes() {
    return this.db.list('/feature-types').snapshotChanges().pipe(
      map(changes => changes.map((c: any) => ( { key: c.payload.key, ...c.payload.val() }) ))
    );
  }

  create(features) {
    return this.db.object('/features').update(features);
  }
}
