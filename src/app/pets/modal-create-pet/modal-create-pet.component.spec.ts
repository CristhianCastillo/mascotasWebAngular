import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreatePetComponent } from './modal-create-pet.component';


describe('ModalCreatePetComponent', () => {
  let component: ModalCreatePetComponent;
  let fixture: ComponentFixture<ModalCreatePetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreatePetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreatePetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
