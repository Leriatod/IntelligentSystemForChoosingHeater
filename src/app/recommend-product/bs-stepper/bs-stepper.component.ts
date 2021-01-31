import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bs-stepper',
  templateUrl: './bs-stepper.component.html',
  styleUrls: ['./bs-stepper.component.scss']
})
export class BsStepperComponent {
  @Input() stepNames = []; 
  @Output() stepChanged = new EventEmitter();

  currentStep: number = 0;

  changeStep(stepNumber) {
    this.currentStep = stepNumber;
    this.stepChanged.emit(this.currentStep);
  }

}
