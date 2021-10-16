import { TestBed } from '@angular/core/testing';

import { GuidGeneratorService } from './guid-generator.service';

describe('GuidGeneratorService', () => {
  let service: GuidGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuidGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
