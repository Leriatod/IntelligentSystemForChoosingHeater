import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRecommendedProductsComponent } from './display-recommended-products.component';

describe('DisplayRecommendedProductsComponent', () => {
  let component: DisplayRecommendedProductsComponent;
  let fixture: ComponentFixture<DisplayRecommendedProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRecommendedProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRecommendedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
