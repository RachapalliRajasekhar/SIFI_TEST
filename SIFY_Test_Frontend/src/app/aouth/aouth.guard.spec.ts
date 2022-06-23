import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { AouthGuard } from './aouth.guard';

describe('AouthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AouthGuard]
    });
  });

  it('should ...', inject([AouthGuard], (guard: AouthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
