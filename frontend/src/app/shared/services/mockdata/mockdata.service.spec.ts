import { TestBed } from '@angular/core/testing';

import { MockdataServiceService } from './mockdata.service';

describe('FakerService', () => {
  let service: MockdataServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockdataServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
