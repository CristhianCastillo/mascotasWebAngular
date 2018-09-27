import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';

@Component({
  selector: 'app-modal-create-agenda',
  templateUrl: './modal-create-agenda.component.html',
  styleUrls: ['./modal-create-agenda.component.css']
})
export class ModalCreateAgendaComponent implements OnInit {

  @Input() agenda: any[];
  time = {hour: 13, minute: 30};
  model;
  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal) {
    config.backdrop = 'static';
  }

  ngOnInit() {
  }

  open(titulo, mensaje) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = titulo;
    modalRef.componentInstance.contenidoMensaje = mensaje;
  }

}
