import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrioritizingFeaturesComponent } from './prioritizing-features.component';

describe('PrioritizingFeaturesComponent', () => {
  let component: PrioritizingFeaturesComponent;
  let fixture: ComponentFixture<PrioritizingFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrioritizingFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrioritizingFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
