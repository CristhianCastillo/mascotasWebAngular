import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Cita } from '../../models/Cita';
import { DateConvert } from '../../models/DateConvert';
import { HourConvert } from '../../models/HourConvert';
import { AgendaService } from '../../services/agenda/agenda.service';
import { environment } from '@env/environment';
import { DateUtils } from '../../utils/date-utils';
import { MessagesUtils} from '../../utils/messages-utils';
import { ValidationsUtils } from '../../utils/validations-utils';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {

  @Input() listaMascotas: any[];
  @Input() mascotaSeleccionada: number;
  @Input() eventoSeleccionado: Cita;

  public agendaForm: FormGroup;
  public services: any;
  public fechaJs: Date;
  public fechaActividad: DateConvert;
  public horaActividad: HourConvert;
  public propiedades: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal, public config: NgbModalConfig,
              private formBuilder: FormBuilder, private agendaService: AgendaService, private messageService: MessagesUtils) {
    config.backdrop = 'static';
    this.propiedades = environment;
  }

  ngOnInit() {
    this.agendaService.getServicesType().subscribe(
      (result: any ) => {
        this.services = result;
      }, (error) => {
        console.error(error);
      }
    );
    this.fechaJs = DateUtils.dateStringToDate(this.eventoSeleccionado.fecha);
    this.fechaActividad = DateUtils.dateToDateConvert(this.fechaJs);
    this.horaActividad = DateUtils.dateStringToHourConvert(this.eventoSeleccionado.fecha);
    this.agendaForm = this.createForm();
  }

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.agendaForm);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.agendaForm);
  }

  private createForm() {
    return this.formBuilder.group({
      idMascota: [this.mascotaSeleccionada, Validators.required],
      nombre : [this.eventoSeleccionado.nombre, Validators.required],
      tipo: [this.eventoSeleccionado.tipoActividad, Validators.required],
      fecha: [this.fechaActividad, Validators.required],
      hora: [this.horaActividad, Validators.required],
      ubicacion: [this.eventoSeleccionado.ubicacion, Validators.required],
      descripcion: [this.eventoSeleccionado.descripcionEvento, Validators.required]
    });
  }

  trackByFn(index, item) {
    return item.id;
  }

  getData() {
    if(this.agendaForm.valid) {
      const fechaJ = this.agendaForm.value['fecha'];
      const horaJ = this.agendaForm.value['hora'];
      let fechaDate: Date = DateUtils.dateHourToDate(fechaJ, horaJ);
      const evento = {
        idMascota: this.agendaForm.value['idMascota'],
        nombre: this.agendaForm.value['nombre'],
        ubicacion: this.agendaForm.value['ubicacion'],
        idTipo: this.agendaForm.value['tipo'],
        fecha: fechaDate.toISOString().slice(0, 10) + ' ' + fechaDate.toISOString().slice(11, 16),
        descripcion: this.agendaForm.value['descripcion']
      };
      this.updateEvent(evento);
    } else {
      ValidationsUtils.validateAllFormFields(this.agendaForm);
    }
  }

  updateEvent(evento) {
    this.agendaService.updateEvent(this.eventoSeleccionado.id, evento).subscribe(
      (result: any ) => {
        if (result.status) {
          this.messageService.showMessage(this.propiedades.components.agenda['modal-search']['update.message.title'], this.propiedades.components.agenda['modal-search']['update.message.correct']);
        } else {
          this.messageService.showMessage(this.propiedades.components.agenda['modal-search']['update.message.title'], this.propiedades.components.agenda['modal-search']['update.message.incorrect']);
        }
      }
    );
  }

  deleteEvent() {
    this.agendaService.deleteEvent(this.eventoSeleccionado.id).subscribe(
      (result: any ) => {
        if (result.status) {
          this.messageService.showMessage(this.propiedades.components.agenda['modal-search']['delete.message.title'], this.propiedades.components.agenda['modal-search']['delete.message.correct']);
        } else {
          this.messageService.showMessage(this.propiedades.components.agenda['modal-search']['delete.message.title'], this.propiedades.components.agenda['modal-search']['delete.message.incorrect']);
        }
      }
    );
  }
}
