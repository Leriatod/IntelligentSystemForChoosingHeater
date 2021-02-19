import { FeatureType } from './models/feature-type';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureTypeService {

  constructor(private db: AngularFireDatabase) { }

  getAllFeatureTypes(): Observable<FeatureType[]> {
    return this.db.list('/feature-types').snapshotChanges().pipe(
      map(changes => changes.map( (c: any) => 
        ( { key: c.payload.key, ...c.payload.val() } as FeatureType) )
      )
    );
  }
}
