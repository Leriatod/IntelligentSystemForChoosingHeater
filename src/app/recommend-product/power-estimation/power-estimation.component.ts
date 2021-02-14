import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'power-estimation',
  templateUrl: './power-estimation.component.html',
  styleUrls: ['./power-estimation.component.scss']
})
export class PowerEstimationComponent implements OnInit {
  @Input() selectedPowerRange = null;
  @Output() powerRangeChanged = new EventEmitter();

  radioButtonsOptionsForPowerEstimation = [
    { id: "square1", label: "5-6 кв. м.",   value: { minPower: 0.5,  maxPower: 0.75 } },
    { id: "square2", label: "7-9 кв. м.",   value: { minPower: 0.75, maxPower: 1    } },
    { id: "square3", label: "10-12 кв. м.", value: { minPower: 1,    maxPower: 1.25 } },
    { id: "square4", label: "12-14 кв. м.", value: { minPower: 1.25, maxPower: 1.5  } },
    { id: "square5", label: "15-17 кв. м.", value: { minPower: 1.5,  maxPower: 1.75 } },
    { id: "square6", label: "18-19 кв. м.", value: { minPower: 1.75, maxPower: 2    } },
    { id: "square7", label: "20-23 кв. м.", value: { minPower: 2,    maxPower: 2.5  } },
    { id: "square8", label: "24-27 кв. м.", value: { minPower: 2.5,  maxPower: 2.75 } },
    { id: "square0", label: "Не обирати",   value: null }
  ];

  ngOnInit() {
    this.radioButtonsOptionsForPowerEstimation.forEach(radio => {
      if (!radio.value || !this.selectedPowerRange) return;
      var powerRangeIsEqual = 
        radio.value.minPower == this.selectedPowerRange.minPower && 
        radio.value.maxPower == this.selectedPowerRange.maxPower;
      if (powerRangeIsEqual) this.selectedPowerRange = radio.value;
    });
  }
 
  onPowerRangeChanged() {
    this.powerRangeChanged.emit(this.selectedPowerRange);
  }
}
