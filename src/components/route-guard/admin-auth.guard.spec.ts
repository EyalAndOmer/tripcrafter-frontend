import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';

import { RouteGuard } from './route-guard';

describe('AdminGuard', () => {
  let guard: CanActivate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RouteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
