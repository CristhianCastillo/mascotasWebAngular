import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessagesUtils } from '../../utils/messages-utils';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AgendaService } from '../../services/agenda/agenda.service';
import { environment } from '@env/environment';
import { DateUtils } from '../../utils/date-utils';
import { ValidationsUtils } from '../../utils/validations-utils';

@Component({
  selector: 'app-modal-create-agenda',
  templateUrl: './modal-create-agenda.component.html',
  styleUrls: ['./modal-create-agenda.component.css']
})
export class ModalCreateAgendaComponent implements OnInit {

  @Input() listaMascotas: any[];
  public agendaForm: FormGroup;
  public services: any;
  public propiedades: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal, public config: NgbModalConfig
    , private modalService: NgbModal, private formBuilder: FormBuilder, private agendaService: AgendaService,
              private messageService: MessagesUtils) {
    config.backdrop = 'static';
    this.propiedades = environment;
  }

  ngOnInit() {
    this.agendaService.getServicesType().subscribe(
      (result: any) => {
        this.services = result;
      }, (error) => {
        console.error(error);
      }
    );
    this.agendaForm = this.createForm();
  }

  trackByFn(index, item) {
    return item.id;
  }

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.agendaForm);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.agendaForm);
  }

  private createForm() {
    return this.formBuilder.group({
      idMascota: ['', Validators.required],
      nombre: ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  getData() {
    if(this.agendaForm.valid) {
      let fechaJ = this.agendaForm.value['fecha'];
      let horaJ = this.agendaForm.value['hora'];
      let fechaDate: Date = DateUtils.dateHourToDate(fechaJ, horaJ);
      let evento = {
        idMascota: this.agendaForm.value['idMascota'],
        nombre: this.agendaForm.value['nombre'],
        ubicacion: this.agendaForm.value['ubicacion'],
        idTipo: this.agendaForm.value['tipo'],
        fecha: fechaDate.toISOString().slice(0, 10) + ' ' + fechaDate.toISOString().slice(11, 16),
        descripcion: this.agendaForm.value['descripcion']
      }
      this.createEvent(evento);
    } else {
      ValidationsUtils.validateAllFormFields(this.agendaForm);
    }
  }

  createEvent(evento) {
    this.agendaService.createEvent(evento).subscribe(
      (result: any) => {
        if (result.status) {
          this.messageService.showMessage(this.propiedades.components.agenda['modal-create'].title, this.propiedades.components.agenda['modal-create']['create.message.correct']);
        } else {
          this.messageService.showMessage(this.propiedades.components.agenda['modal-create'].title, this.propiedades.components.agenda['modal-create']['create.message.incorrect']);
        }
      }
    );
  }
}
