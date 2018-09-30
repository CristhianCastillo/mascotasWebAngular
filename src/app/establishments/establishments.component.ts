import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../modal-out-message/modal-out-message.component';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit {

  datosEstablecimiento = {
      nombre: 'Veterinaria Grecia',
      telefono: '321312332',
      direccion: 'Crr 35 F 545 sur',
      correo: 'veterinariaGrecia@gmail.com',
      paginaWeb: 'www.veterinariagrecia.com',
      servicios: 'Peluqueria',
      horarios: 'Establecido',
      horaInicial: '08:00',
      horaFinal: '22:00',
      descripcion: 'Veterinaria para todo tipo de mascotas'
    } ;
  constructor(public config: NgbModalConfig, private modalService: NgbModal, private scrollTop: ScrollTopService) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }

  saveInformation(titulo, mensaje) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = titulo;
    modalRef.componentInstance.contenidoMensaje = mensaje;
  }

}
