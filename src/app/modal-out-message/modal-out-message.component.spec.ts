import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOutMessageComponent } from './modal-out-message.component';

describe('ModalOutMessageComponent', () => {
  let component: ModalOutMessageComponent;
  let fixture: ComponentFixture<ModalOutMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOutMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
