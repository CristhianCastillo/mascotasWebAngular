import { TestBed, async, inject } from '@angular/core/testing';

import { NoLoginAdminGuard } from './no-login-admin.guard';

describe('NoLoginAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoLoginAdminGuard]
    });
  });

  it('should ...', inject([NoLoginAdminGuard], (guard: NoLoginAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
