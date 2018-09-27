import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSupplieComponent } from './modal-supplie.component';

describe('ModalSupplieComponent', () => {
  let component: ModalSupplieComponent;
  let fixture: ComponentFixture<ModalSupplieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSupplieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSupplieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
