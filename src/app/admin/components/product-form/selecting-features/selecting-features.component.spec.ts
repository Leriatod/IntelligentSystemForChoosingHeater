import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectingFeaturesComponent } from './selecting-features.component';

describe('SelectingFeaturesComponent', () => {
  let component: SelectingFeaturesComponent;
  let fixture: ComponentFixture<SelectingFeaturesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectingFeaturesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectingFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
