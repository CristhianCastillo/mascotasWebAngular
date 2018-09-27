import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreateAgendaComponent } from './modal-create-agenda.component';

describe('ModalCreateAgendaComponent', () => {
  let component: ModalCreateAgendaComponent;
  let fixture: ComponentFixture<ModalCreateAgendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreateAgendaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreateAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
