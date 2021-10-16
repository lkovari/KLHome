import { TestBed } from '@angular/core/testing';

import { FirebaseUsersService } from './firebase-users.service';

describe('FirebaseUsersService', () => {
  let service: FirebaseUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirebaseUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
