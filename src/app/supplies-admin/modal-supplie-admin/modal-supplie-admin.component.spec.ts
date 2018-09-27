import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplieAdminComponent } from './modal-supplie-admin.component';

describe('ModalSupplieAdminComponent', () => {
  let component: ModalSupplieAdminComponent;
  let fixture: ComponentFixture<ModalSupplieAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSupplieAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSupplieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
