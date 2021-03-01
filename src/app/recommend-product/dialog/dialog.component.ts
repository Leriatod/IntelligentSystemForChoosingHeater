import { FeatureTypeService } from './../../feature-type.service';
import { Subscription } from 'rxjs';
import { FeatureType } from './../../models/feature-type';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ViewChild } from '@angular/core';
import { SortableComponent } from 'ngx-bootstrap/sortable';

@Component({
  selector: 'user-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy {
  @Output() featuresChange = new EventEmitter();
  @Output() maxPriceChange = new EventEmitter();
  @Input() features = [];
  @Input() maxPrice = 2000;
  featureTypes: FeatureType[];
  subscription: Subscription;

  constructor(private featureTypeService: FeatureTypeService) { }

  ngOnInit() {
    this.subscription = this.featureTypeService.getAllFeatureTypes()
      .subscribe(featureTypes => this.featureTypes = featureTypes);
  }

  onMaxPriceChange() {
    this.maxPriceChange.emit(this.maxPrice);
  }

  onRadioButtonFeatureSelect(featureTypeId: string, feature) {
    var radioButtons = document.getElementsByName(featureTypeId);
    
    radioButtons.forEach((radio: any) => {
      if (radio.checked && radio.value) {
        this.features.push({ key: feature.key, ...feature.value });
        return;
      } 
      var index = this.features.findIndex(f => f.key === radio.id);
      if (index > -1) this.features.splice(index, 1);
    });
    this.updateSortableComponent();
    this.onFeatureOrderChange();
  }

  onCheckBoxFeatureSelect(feature) {
    var index = this.features.findIndex(f => f.key === feature.key);
    if (index > -1) {
      this.features.splice(index, 1);
    } else {
      this.features.push({ key: feature.key, ...feature.value });
    }
    this.updateSortableComponent();
    this.onFeatureOrderChange();
  }

  onFeatureOrderChange() {
    var n = this.features.length;
    if (n === 0) return;

    var scale = 0.75;
    // geometric progression formula if sum is equal to 1
    var coeff1 = (scale - 1) / (Math.pow(scale, n) - 1);
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
    var index = this.features.findIndex(f => f.key === feature.key);
    return index > -1;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
