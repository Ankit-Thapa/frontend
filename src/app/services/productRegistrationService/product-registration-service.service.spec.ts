import { TestBed } from '@angular/core/testing';

import { ProductRegistrationServiceService } from './product-registration-service.service';

describe('ProductRegistrationServiceService', () => {
  let service: ProductRegistrationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRegistrationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
