import { Injectable } from "@angular/core";
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../modal-out-message/modal-out-message.component';
import { environment } from '@env/environment';

@Injectable()
export class MessagesUtils {
  constructor(public activeModal: NgbActiveModal, public config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
  }

  showMessage(title?: string, message?: string){
    this.modalService.dismissAll();
    let modalRef = this.modalService.open(ModalOutMessageComponent, {centered: true});
    modalRef.componentInstance.tituloMensaje = (title != null) ? title : environment.common.messages.information['title.common'];
    modalRef.componentInstance.contenidoMensaje = (message != null) ? title : environment.common.messages.information['message.common'];
    modalRef.componentInstance.imagen = environment.common.messages.information['icon.common'];
  }

  showMessageSucces(title?: string, message?: string) {
    this.modalService.dismissAll();
    let modalRef = this.modalService.open(ModalOutMessageComponent, {centered: true});
    modalRef.componentInstance.tituloMensaje = (title != null) ? title : environment.common.messages.correct['title.common'];
    modalRef.componentInstance.contenidoMensaje = (message != null) ? message : environment.common.messages.correct['message.common'];
    modalRef.componentInstance.imagen = environment.common.messages.correct['icon.common']
  }

  showMessageWarning(title?: string, message?: string) {
    this.modalService.dismissAll();
    let modalRef = this.modalService.open(ModalOutMessageComponent, {centered: true});
    modalRef.componentInstance.tituloMensaje = (title != null) ? title : environment.common.messages.warning['title.common'];
    modalRef.componentInstance.contenidoMensaje = (message != null) ? message : environment.common.messages.warning['message.common'];
    modalRef.componentInstance.imagen = environment.common.messages.warning['icon.common']
  }

  showMessageError(title?: string, message?: string) {
    this.modalService.dismissAll();
    let modalRef = this.modalService.open(ModalOutMessageComponent, {centered: true});
    modalRef.componentInstance.tituloMensaje = (title != null) ? title : environment.common.messages.error['title.common'];
    modalRef.componentInstance.contenidoMensaje = (message != null) ? message : environment.common.messages.error['message.common'];
    modalRef.componentInstance.imagen = environment.common.messages.error['icon.common']
  }
}
