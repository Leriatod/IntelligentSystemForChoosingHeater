import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FeatureType } from 'src/app/models/feature-type';

@Component({
  selector: 'selecting-features',
  templateUrl: './selecting-features.component.html',
  styleUrls: ['./selecting-features.component.scss']
})
export class SelectingFeaturesComponent {
  @Output() featuresChange = new EventEmitter();
  @Input() features: { 
    [featureKey: string]: { 
      name: string
    } 
  } = {};
  @Input() featureTypes: FeatureType[];

  onCheckBoxChange(feature) {
    if (this.features[feature.key]) {
      delete this.features[feature.key];
      return;
    }
    this.features[feature.key] = { name: feature.value.name };
  }

  onRadioButtonClick(featureTypeKey: string, feature) {
    var radioButtons = document.getElementsByName(featureTypeKey);

    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.features[radio.id] = { name: feature.value.name };
        return;
      }
      delete this.features[radio.id];
    });
  }
}
