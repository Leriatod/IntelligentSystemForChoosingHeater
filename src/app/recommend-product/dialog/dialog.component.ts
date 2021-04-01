import { Options } from '@angular-slider/ngx-slider';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SortableComponent } from 'ngx-bootstrap/sortable';

import { FeatureType } from '../../shared/models/feature-type';

@Component({
  selector: 'user-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  @Output() featuresChange = new EventEmitter();
  @Output() maxPriceChange = new EventEmitter();
  @Output() roomAreaChange = new EventEmitter();
  @Input() features = [];
  @Input() maxPrice = 2000;
  @Input() roomArea = 0;
  @Input() powerPerSquareMeter = 0.1; // kW
  @Input() featureTypes: FeatureType[];

  priceSliderOptions: Options = { 
    floor: 1000, 
    step: 250, 
    ceil: 4000, 
    translate: (price: number) => `${price} грн.`
  };
  roomAreaSliderOptions: Options = {
    floor: 0,
    ceil: 35,
    translate: (roomArea: number) => {
      if (roomArea === 0) return 'Не враховувати';
      return `${roomArea} м2`;
    }
  };

  onMaxPriceChange() { this.maxPriceChange.emit(this.maxPrice); }
  onRoomAreaChange() { this.roomAreaChange.emit(this.roomArea); }

  onRadioButtonFeatureSelect(featureTypeKey: string, feature) {
    let radioButtons = document.getElementsByName(featureTypeKey);
    
    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.features.push({ key: feature.key, ...feature.value });
        return;
      } 
      let index = this.features.findIndex(f => f.key === radio.id);
      if (index > -1) this.features.splice(index, 1);
    });
    this.updateSortableComponent();
    this.onFeatureOrderChange();
  }

  onCheckBoxFeatureSelect(feature) {
    let index = this.features.findIndex(f => f.key === feature.key);
    if (index > -1) {
      this.features.splice(index, 1);
    } else {
      this.features.push({ key: feature.key, ...feature.value });
    }
    this.updateSortableComponent();
    this.onFeatureOrderChange();
  }

  onFeatureOrderChange() {
    let n = this.features.length;
    if (n === 0) return;

    let scale = 0.75;
    // geometric progression formula if sum is equal to 1
    let coeff1 = (scale - 1) / (Math.pow(scale, n) - 1);
    for (let i = 0; i < n; i++) {
      this.features[i].coeff = coeff1 * Math.pow(scale, i);
    }
    this.featuresChange.emit(this.features);
  }

  @ViewChild(SortableComponent) sortableComponent: SortableComponent;
  private updateSortableComponent() {
    this.sortableComponent.writeValue(this.features);
  }

  isFeatureSelected(feature) {
    let index = this.features.findIndex(f => f.key === feature.key);
    return index > -1;
  }
}
