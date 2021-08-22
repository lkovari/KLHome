import { TestBed } from '@angular/core/testing';

import { DummyFormdataService } from './dummy-formdata.service';

describe('DummyFormdataService', () => {
  let service: DummyFormdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyFormdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
