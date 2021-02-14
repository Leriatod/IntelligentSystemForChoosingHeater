import { FeatureTypeService } from './../../feature-type.service';
import { Subscription } from 'rxjs';
import { FeatureType } from './../../models/feature-type';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'user-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @Output() featureChanged = new EventEmitter();
  @Input() selectedFeatures = {};

  featureTypes: FeatureType[];

  subscription: Subscription;

  constructor(private featureTypeService: FeatureTypeService) { }

  ngOnInit() {
    this.subscription = this.featureTypeService.getAllFeatureTypes()
      .subscribe(featureTypes => this.featureTypes = featureTypes);
  }

  onRadioButtonFeatureSelect(featureTypeId: string, feature) {
    var radioButtons = document.getElementsByName(featureTypeId);

    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.selectedFeatures[radio.id] = feature.value;
        return;
      } 
      delete this.selectedFeatures[radio.id];
    });
    this.featureChanged.emit(this.selectedFeatures);
  }

  onCheckBoxFeatureSelect(feature) {
    if (this.selectedFeatures[feature.key]) {
      delete this.selectedFeatures[feature.key];
    } else {
      this.selectedFeatures[feature.key] = feature.value;
    }
    this.featureChanged.emit(this.selectedFeatures);
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
