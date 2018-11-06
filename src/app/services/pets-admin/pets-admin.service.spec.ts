import { TestBed, inject } from '@angular/core/testing';

import { PetsAdminService } from './pets-admin.service';

describe('PetsAdminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PetsAdminService]
    });
  });

  it('should be created', inject([PetsAdminService], (service: PetsAdminService) => {
    expect(service).toBeTruthy();
  }));
});
