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
  @Output() featureChanged = new EventEmitter();
  @Input() selectedFeatures = [];
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
        this.selectedFeatures.push({ key: feature.key, ...feature.value });
        return;
      } 
      var index = this.selectedFeatures.findIndex(f => f.key === radio.id);
      if (index > -1) this.selectedFeatures.splice(index, 1);
    });
    this.updateSortableComponent();
    this.onFeatureOrderChange();
  }

  onCheckBoxFeatureSelect(feature) {
    var index = this.selectedFeatures.findIndex(f => f.key === feature.key);
    if (index > -1) {
      this.selectedFeatures.splice(index, 1);
    } else {
      this.selectedFeatures.push({ key: feature.key, ...feature.value });
    }
    this.updateSortableComponent();
    this.onFeatureOrderChange();
  }

  onFeatureOrderChange() {
    var n = this.selectedFeatures.length;
    if (n === 0) return;

    var scale = 0.75;
    // geometric progression formula if sum is equal to 1
    var coeff1 = (scale - 1) / (Math.pow(scale, n) - 1);
    for (let i = 0; i < n; i++) {
      this.selectedFeatures[i].coeff = coeff1 * Math.pow(scale, i);
    }
    this.featureChanged.emit(this.selectedFeatures);
  }

  @ViewChild(SortableComponent) sortableComponent: SortableComponent;
  private updateSortableComponent() {
    this.sortableComponent.writeValue(this.selectedFeatures);
  }

  isFeatureSelected(feature) {
    var index = this.selectedFeatures.findIndex(f => f.key === feature.key);
    return index > -1;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
