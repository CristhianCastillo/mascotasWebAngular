import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { Cita } from '../../models/Cita';
import { DateConvert } from '../../models/DateConvert';
import { HourConvert } from '../../models/HourConvert';

@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {

  @Input() mascotas: any[];
  @Input() mascotaSeleccionada: number;
  @Input() eventoSeleccionado: Cita;

  public agendaForm: FormGroup;

  public fechaJs: Date;
  public fechaActividad: DateConvert;
  public horaActividad: HourConvert;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    console.log(this.eventoSeleccionado);
    this.fechaActividad = new DateConvert();
    //Fecha Evento
    this.fechaJs = new Date(this.eventoSeleccionado.fechaEvento);
    this.fechaActividad.year = this.fechaJs.getUTCFullYear();
    this.fechaActividad.month = (this.fechaJs.getUTCMonth() + 1);
    this.fechaActividad.day = this.fechaJs.getUTCDate();
    //Hora Evento
    let parts: string[] = this.eventoSeleccionado.horaEvento.split(':');
    console.log(parts);
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
      id: this.eventoSeleccionado.id,
      nombre: this.agendaForm.value['nombre'],
      ubicacion: this.agendaForm.value['ubicacion'],
      tipo: this.agendaForm.value['tipo'],
      fecha: fechaDate.toISOString().slice(0, 10),
      hora: fechaDate.toISOString().slice(11, 16),
      descripcion: this.agendaForm.value['descripcion']
    }
    this.updateEvent(evento);
  }

  updateEvent(evento){
    console.log(evento);
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = 'Actualizar Evento';
    modalRef.componentInstance.contenidoMensaje = 'Evento actualizado correctamente';

    // this.servicePet.updatePet(this.mascota.id, data).subscribe(
    //   (result: boolean ) => {
    //     console.log(result);
    //     if (result) {
    //       this.modalService.dismissAll();
    //       const modalRef = this.modalService.open(ModalOutMessageComponent);
    //       modalRef.componentInstance.tituloMensaje = titulo;
    //       modalRef.componentInstance.contenidoMensaje = mensaje;
    //     } else {
    //       this.modalService.dismissAll();
    //       const modalRef = this.modalService.open(ModalOutMessageComponent);
    //       modalRef.componentInstance.tituloMensaje = titulo;
    //       modalRef.componentInstance.contenidoMensaje = 'No se ha podido actualizar la mascota';
    //     }
    //   }
    // );
  }

  openModalConfirm(titulo, mensaje) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = titulo;
    modalRef.componentInstance.contenidoMensaje = mensaje;
  }
}
