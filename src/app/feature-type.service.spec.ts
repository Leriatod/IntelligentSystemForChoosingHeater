import { TestBed } from '@angular/core/testing';

import { FeatureTypeService } from './feature-type.service';

describe('FeatureService', () => {
  let service: FeatureTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
