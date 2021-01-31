import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsStepperComponent } from './bs-stepper.component';

describe('BsStepperComponent', () => {
  let component: BsStepperComponent;
  let fixture: ComponentFixture<BsStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
