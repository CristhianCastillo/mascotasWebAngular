import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ScrollTopService } from '../services/scroll-top.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RequestsService } from '../services/requests/requests.service';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {ModalOutMessageComponent} from '../modal-out-message/modal-out-message.component';

@Component({
  selector: 'app-pets-admin',
  templateUrl: './pets-admin.component.html',
  styleUrls: ['./pets-admin.component.css']
})
export class PetsAdminComponent implements OnInit {
  public requests: any;
  public requestSelected: any;
  public formAdmin: FormGroup;
  public formSend: FormGroup;
  constructor(private router: Router,private scrollTop: ScrollTopService, private modalService: NgbModal,
              private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private service: RequestsService,
              public config: NgbModalConfig) {
    this.formAdmin = this.createFormAdmin();
    this.formSend = this.createFormSend();
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    this.spinner.show();
    this.service.getTopRequests(usuarioAutentificado.id).subscribe(
      (data: any) => {
        this.requests = data;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error(error);
      }
    );
  }

  private createFormAdmin() {
    return this.formBuilder.group({
      fechaInicial: ['', Validators.required],
      fechaFinal : ['', Validators.required],
    });
  }

  private createFormSend() {
    return this.formBuilder.group({
      mensaje: ['', Validators.required]
    });
  }

  search(){
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    const fechaInicialJ = this.formAdmin.value['fechaInicial'];
    const fechaFinalJ = this.formAdmin.value['fechaFinal'];
    let fechaInicialDate: Date = new Date(Date.UTC(fechaInicialJ.year, fechaInicialJ.month - 1, fechaInicialJ.day, 1, 0, 0, 0));
    let fechaFinalDate: Date = new Date(Date.UTC(fechaFinalJ.year, fechaFinalJ.month - 1, fechaFinalJ.day, 1, 0, 0, 0));
    const filtro = {
      fechaInicial: fechaInicialDate.toISOString().slice(0, 10),
      fechaFinal: fechaFinalDate.toISOString().slice(0, 10)
    };
    this.service.getRequestsDate(filtro, usuarioAutentificado.id).subscribe(
      (result: any) => {
        console.log(result);
        if (result === 'false') {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Upsss!!!";
          modalRef.componentInstance.contenidoMensaje = "No se puede buscar las solicitudes ene ste momento.";
        } else {
          this.requests = result;
        }
      }
    );
  }

  openModalSendResponse(content, request){
    this.requestSelected = request;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.ngOnInit();
    }, (reason) => {
      this.ngOnInit();
    });
  }

  sendResponse(){
    const responseRequest = {
      respuesta: this.formSend.value['mensaje']
    }
    this.service.sendResponse(responseRequest, this.requestSelected.id).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Enviar respuesta";
          modalRef.componentInstance.contenidoMensaje = "Mensaje enviado correctamente.";
        } else {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Enviar respuesta";
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido enviar el mensaje.';
        }
      }
    );
  }
}
