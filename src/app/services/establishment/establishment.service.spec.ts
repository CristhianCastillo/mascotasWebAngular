import { TestBed, inject } from '@angular/core/testing';

import { EstablishmentService } from './establishment.service';

describe('EstablishmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstablishmentService]
    });
  });

  it('should be created', inject([EstablishmentService], (service: EstablishmentService) => {
    expect(service).toBeTruthy();
  }));
});
