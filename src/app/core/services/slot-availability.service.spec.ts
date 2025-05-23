import { TestBed } from '@angular/core/testing';

import { SlotAvailabilityService } from './slot-availability.service';

describe('SlotAvailabilityService', () => {
  let service: SlotAvailabilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlotAvailabilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
