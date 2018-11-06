import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Cita } from '../../models/Cita';
import { DateConvert } from '../../models/DateConvert';
import { HourConvert } from '../../models/HourConvert';
import { AgendaService } from '../../services/agenda/agenda.service';

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

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal, private formBuilder: FormBuilder, private agendaService: AgendaService) {
    config.backdrop = 'static';
  }

  ngOnInit() {

    this.agendaService.getServicesType().subscribe(
      (result: any ) => {
        this.services = result;
      },
      (error) => {
        console.error(error);
      }
    );
    console.log(this.eventoSeleccionado);
    this.fechaActividad = new DateConvert();
    //Fecha Evento
    this.fechaJs = new Date(this.eventoSeleccionado.fecha);
    this.fechaActividad.year = this.fechaJs.getUTCFullYear();
    this.fechaActividad.month = (this.fechaJs.getUTCMonth() + 1);
    this.fechaActividad.day = this.fechaJs.getUTCDate();
    //Hora Evento
    let hora: string[] = this.eventoSeleccionado.fecha.split(' ');
    let parts: string[] = hora[1].split(':');
    console.log(hora[1]);
    this.horaActividad = new HourConvert();
    this.horaActividad.hour = Number(parts[0]);
    this.horaActividad.minute = Number(parts[1]);
    this.agendaForm = this.createForm();
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

  getData(){
    const fechaJ = this.agendaForm.value['fecha'];
    const horaJ = this.agendaForm.value['hora'];
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, horaJ.hour, horaJ.minute, 0, 0))
    console.log(fechaDate.toISOString().slice(0, 10));
    console.log(fechaDate.toISOString().slice(11, 16));
    const evento = {
      idMascota: this.agendaForm.value['idMascota'],
      nombre: this.agendaForm.value['nombre'],
      ubicacion: this.agendaForm.value['ubicacion'],
      idTipo: this.agendaForm.value['tipo'],
      fecha: fechaDate.toISOString().slice(0, 10) + ' ' + fechaDate.toISOString().slice(11, 16),
      descripcion: this.agendaForm.value['descripcion']
    }
    this.updateEvent(evento);
  }

  updateEvent(evento){
    console.log(evento);
    this.agendaService.updateEvent(this.eventoSeleccionado.id, evento).subscribe(
      (result: any ) => {
        console.log(result);
        if (result.status) {
          this.openModalConfirm("Actualizar Evento", "Evento actualizado correctamente.");
        } else {
          this.openModalConfirm("Actualizar Evento", "El evento no se ha podido actualizar.");
        }
      }
    );
  }

  deleteEvent(){
    this.agendaService.deleteEvent(this.eventoSeleccionado.id).subscribe(
      (result: any ) => {
        console.log(result);
        if (result.status) {
          this.openModalConfirm("Eliminar Evento", "Evento eliminado correctamente.");
        } else {
          this.openModalConfirm("Eliminar Evento", "El evento no se ha podido eliminar.");
        }
      }
    );
  }

  openModalConfirm(titulo, mensaje) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = titulo;
    modalRef.componentInstance.contenidoMensaje = mensaje;
  }
}
