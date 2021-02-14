import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerEstimationComponent } from './power-estimation.component';

describe('PowerEstimationComponent', () => {
  let component: PowerEstimationComponent;
  let fixture: ComponentFixture<PowerEstimationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerEstimationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerEstimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
