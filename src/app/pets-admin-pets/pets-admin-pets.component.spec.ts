import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsAdminPetsComponent } from './pets-admin-pets.component';

describe('PetsAdminPetsComponent', () => {
  let component: PetsAdminPetsComponent;
  let fixture: ComponentFixture<PetsAdminPetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsAdminPetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsAdminPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
