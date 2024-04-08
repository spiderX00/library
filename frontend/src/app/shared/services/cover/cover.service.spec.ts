import { TestBed } from '@angular/core/testing';

import { Cover } from './cover.service';

describe('CoverService', () => {
  let service: Cover;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cover);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
