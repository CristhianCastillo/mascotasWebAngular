import { TestBed, async, inject } from '@angular/core/testing';

import { LoginAdminGuard } from './login-admin.guard';

describe('LoginAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginAdminGuard]
    });
  });

  it('should ...', inject([LoginAdminGuard], (guard: LoginAdminGuard) => {
    expect(guard).toBeTruthy();
  }));
});
