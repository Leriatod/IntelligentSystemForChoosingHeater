import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bs-stepper',
  templateUrl: './bs-stepper.component.html',
  styleUrls: ['./bs-stepper.component.scss']
})
export class BsStepperComponent {
  @Input() stepNames = []; 
  @Input() currentStep = 0;
  @Output() stepChanged = new EventEmitter();

  changeStep(stepNumber) {
    this.currentStep = stepNumber;
    this.stepChanged.emit(this.currentStep);
  }

}
