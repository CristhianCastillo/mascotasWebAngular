import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateSupplieAdminComponent } from './modal-create-supplie-admin.component';

describe('ModalCreateSupplieAdminComponent', () => {
  let component: ModalCreateSupplieAdminComponent;
  let fixture: ComponentFixture<ModalCreateSupplieAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateSupplieAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateSupplieAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
