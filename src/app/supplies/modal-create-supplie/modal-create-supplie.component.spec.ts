import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateSupplieComponent } from './modal-create-supplie.component';

describe('ModalCreateSupplieComponent', () => {
  let component: ModalCreateSupplieComponent;
  let fixture: ComponentFixture<ModalCreateSupplieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateSupplieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateSupplieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
