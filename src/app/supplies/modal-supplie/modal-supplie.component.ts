import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';

@Component({
  selector: 'app-modal-supplie',
  templateUrl: './modal-supplie.component.html',
  styleUrls: ['./modal-supplie.component.css']
})
export class ModalSupplieComponent implements OnInit {

  @Input() suministroSeleccionado: any;
  nombreSuministro: string;
  cantidadSuministro: number;
  unidadMedida: string;
  fechaCompra: Date;
  fechaModelo: FechaConvert;
  precioSuministro: number;
  nombreTienda: string;
  consumoDiario: string;
  comentarios: string;
  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.fechaModelo = new FechaConvert();
    this.nombreSuministro = this.suministroSeleccionado.nombreSuministro;
    this.cantidadSuministro = this.suministroSeleccionado.cantidadSuministro;
    this.unidadMedida = this.suministroSeleccionado.unidadMedida;
    this.fechaCompra = new Date(this.suministroSeleccionado.fechaCompra);
    this.fechaModelo.year = this.fechaCompra.getFullYear();
    this.fechaModelo.month = this.fechaCompra.getMonth();
    this.fechaModelo.day = this.fechaCompra.getDate();
    this.precioSuministro = this.suministroSeleccionado.precio;
    this.nombreTienda = this.suministroSeleccionado.tienda;
    this.consumoDiario = this.suministroSeleccionado.consumoDiario;
    this.comentarios = this.suministroSeleccionado.comentarios;
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
