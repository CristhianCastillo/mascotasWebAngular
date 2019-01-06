import { TestBed, async, inject } from '@angular/core/testing';

import { LoginUserGuard } from './login-user.guard';

describe('LoginUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginUserGuard]
    });
  });

  it('should ...', inject([LoginUserGuard], (guard: LoginUserGuard) => {
    expect(guard).toBeTruthy();
  }));
});
