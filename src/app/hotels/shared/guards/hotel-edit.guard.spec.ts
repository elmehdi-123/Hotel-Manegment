import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { HotelEditGuard } from './hotel-edit.guard';

describe('HotelEditGuard', () => {
  // @ts-ignore
  let guard: HotelEditGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HotelEditGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
