import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetsAdminOwnerComponent } from './pets-admin-owner.component';

describe('PetsAdminOwnerComponent', () => {
  let component: PetsAdminOwnerComponent;
  let fixture: ComponentFixture<PetsAdminOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetsAdminOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetsAdminOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
