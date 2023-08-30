import { TestBed } from '@angular/core/testing';

import { DispatcherServiceService } from './dispatcher-service.service';

describe('DispatcherServiceService', () => {
  let service: DispatcherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispatcherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
