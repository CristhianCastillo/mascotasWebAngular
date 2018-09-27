import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
@Component({
  selector: 'app-modal-agenda',
  templateUrl: './modal-agenda.component.html',
  styleUrls: ['./modal-agenda.component.css']
})
export class ModalAgendaComponent implements OnInit {

  @Input() mascotas: any[];
  @Input() mascotaSeleccionada: string;
  @Input() eventoSeleccionado: any;
  nombreEvento: string;
  ubicacion: string;
  tipoActividad: string;
  fechaActividad: FechaConvert;
  fechaConvert: Date;
  horaConvert: Date;
  horaActividad: HoraConvert;
  descripcionActividad: string;
  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.fechaActividad = new FechaConvert();
    this.horaActividad = new HoraConvert();
    this.nombreEvento = this.eventoSeleccionado.nombreEvento;
    this.ubicacion = this.eventoSeleccionado.ubicacion;
    this.tipoActividad = this.eventoSeleccionado.tipoActividad;
    this.fechaConvert = new Date(this.eventoSeleccionado.fecha);
    this.fechaActividad.year = this.fechaConvert.getFullYear();
    this.fechaActividad.month = (this.fechaConvert.getMonth() + 1);
    this.fechaActividad.day = this.fechaConvert.getDate();
    this.horaConvert = new Date(this.eventoSeleccionado.hora);
    this.horaActividad.hour = this.horaConvert.getHours();
    this.horaActividad.minute = this.horaConvert.getMinutes();
    this.descripcionActividad = this.eventoSeleccionado.descripcionActividad;
  }

  openModalUpdate(titulo, mensaje) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = titulo;
    modalRef.componentInstance.contenidoMensaje = mensaje;
  }
  openModalConfirm(titulo, mensaje) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = titulo;
    modalRef.componentInstance.contenidoMensaje = mensaje;
  }

}

export class FechaConvert {
  public year: number;
  public month: number;
  public day: number;
}

export class HoraConvert {
  public hour: number;
  public minute: number;
}
