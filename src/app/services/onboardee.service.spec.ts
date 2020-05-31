import { TestBed } from '@angular/core/testing';

import { OnboardeeService } from './onboardee.service';

describe('OnboardeeService', () => {
  let service: OnboardeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
