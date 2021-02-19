import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import * as _ from 'underscore';

@Component({
  selector: 'prioritizing-features',
  templateUrl: './prioritizing-features.component.html',
  styleUrls: ['./prioritizing-features.component.scss']
})
export class PrioritizingFeaturesComponent implements OnInit {
  @Input() selectedFeatures         = {};
  @Output() featurePriorityChanged = new EventEmitter();
  featuresArray = [];

  ngOnInit() {
    for (var feature in this.selectedFeatures) {
      this.featuresArray.push({ key: feature, ...this.selectedFeatures[feature] });
    }
    this.featuresArray = _.sortBy(this.featuresArray, f => -f.coeff);
  }

  onFeatureOrderChange() {
    if (this.featuresArray.length === 0) return;

    var scale = 0.75;
    var n     = this.featuresArray.length; 
    // geometric progression formula if sum is equal to 1
    var coeff1 = (scale - 1) / (Math.pow(scale, n) - 1);
    for (let i = 0; i < n; i++) {
      var feature = this.featuresArray[i];
      feature.coeff = coeff1 * Math.pow(scale, i);
      this.selectedFeatures[feature.key].coeff = feature.coeff;
    }
    this.featurePriorityChanged.emit(this.selectedFeatures);
  }

}
