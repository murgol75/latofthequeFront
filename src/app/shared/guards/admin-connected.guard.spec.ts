import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminConnectedGuard } from './admin-connected.guard';

describe('adminConnectedGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminConnectedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
