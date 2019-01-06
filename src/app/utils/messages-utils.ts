import { Injectable } from "@angular/core";
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../modal-out-message/modal-out-message.component';
@Injectable()
export class MessagesUtils {
  constructor(public activeModal: NgbActiveModal, public config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
  }

  showMessage(title: string, message: string){
    this.modalService.dismissAll();
    let modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = title;
    modalRef.componentInstance.contenidoMensaje = message;
  }
}
