import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPetsAdminComponent } from './modal-pets-admin.component';

describe('ModalPetsAdminComponent', () => {
  let component: ModalPetsAdminComponent;
  let fixture: ComponentFixture<ModalPetsAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPetsAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPetsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
