import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Cita } from '@models/Cita';
import { DateConvert } from '@models/DateConvert';
import { AgendaService } from '@services/agenda/agenda.service';
import { environment } from '@env/environment';
import { DateUtils } from '@utils/date-utils';
import { MessagesUtils} from '@utils/messages-utils';
import { ValidationsUtils } from '@utils/validations-utils';
import * as CommonConst from '@constants/common';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})

/**
 * Class to show Modal for create a register to user´s agenda.
 */
export class ModalAgendaComponent implements OnInit {

  // ---------------------------------------------------------------------------------------------
  //  Constants
  // ---------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  //  Variables
  // ---------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  //  Constructors
  // ---------------------------------------------------------------------------------------------

  // ---------------------------------------------------------------------------------------------
  //  Methods
  // ---------------------------------------------------------------------------------------------
  @Input() listaMascotas: any[];
  @Input() mascotaSeleccionada: number;
  @Input() eventoSeleccionado: Cita;

  public agendaForm: FormGroup;
  public services: any;
  public fechaJs: Date;
  public fechaActividad: DateConvert;
  public propiedades: any;

  /**
   *
   * @param calendar
   * @param activeModal
   * @param config
   * @param formBuilder
   * @param agendaService
   * @param messageService
   */
  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal, public config: NgbModalConfig,
              private formBuilder: FormBuilder, private agendaService: AgendaService, private messageService: MessagesUtils) {
    config.backdrop = 'static';
    this.propiedades = environment;
  }

  ngOnInit() {
    this.agendaService.getServicesType().subscribe(
      (result: any ) => {
        if(result.code === CommonConst.SUCCESS_CODE) {
          this.services = result.result;
        } else {
          this.messageService.showMessageError(null, result.description);
        }
      }, (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );
    this.fechaJs = DateUtils.dateStringToDate(this.eventoSeleccionado.fecha);
    this.fechaActividad = DateUtils.dateToDateConvert(this.fechaJs);
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
      hora: [DateUtils.dateStringToHourString(this.eventoSeleccionado.fecha), Validators.required],
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
      let fechaDate: Date = DateUtils.dateJsonToDate(fechaJ);
      const evento = {
        idMascota: this.agendaForm.value['idMascota'],
        idTipo: this.agendaForm.value['tipo'],
        nombre: this.agendaForm.value['nombre'],
        ubicacion: this.agendaForm.value['ubicacion'],
        fecha: fechaDate.toISOString().slice(0, 10) + ' ' + this.agendaForm.value['hora'],
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
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.messageService.showMessageSucces(this.propiedades.components.agenda['modal-search']['update.message.title'], this.propiedades.components.agenda['modal-search']['update.message.correct']);
        } else {
          this.messageService.showMessageError(this.propiedades.components.agenda['modal-search']['update.message.title'], this.propiedades.components.agenda['modal-search']['update.message.incorrect']);
        }
      }, (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );
  }

  deleteEvent() {
    this.agendaService.deleteEvent(this.eventoSeleccionado.id).subscribe(
      (result: any ) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.messageService.showMessageSucces(this.propiedades.components.agenda['modal-search']['delete.message.title'], this.propiedades.components.agenda['modal-search']['delete.message.correct']);
        } else {
          this.messageService.showMessageError(this.propiedades.components.agenda['modal-search']['delete.message.title'], this.propiedades.components.agenda['modal-search']['delete.message.incorrect']);
        }
      }, (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );
  }
}
