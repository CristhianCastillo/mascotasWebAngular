import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RequestsService } from '../services/requests/requests.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import * as LoginConst from '../constants/login';
import { DateUtils } from '../utils/date-utils';
import { environment } from '@env/environment';
import { MessagesUtils } from '../utils/messages-utils';
import { ValidationsUtils } from '../utils/validations-utils';

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
  public propiedades: any;
  public variables: any;
  constructor(private router: Router,private scrollTop: ScrollTopService, private modalService: NgbModal,
              private spinner: NgxSpinnerService, private formBuilder: FormBuilder, private service: RequestsService,
              public config: NgbModalConfig, private serviceMessage: MessagesUtils) {
    this.propiedades = environment.components['pets-admin'];
    this.variables = environment;
    this.formAdmin = this.createFormAdmin();
    this.formSend = this.createFormSend();
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
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

  trackByFn(index, item) {
    return item.id;
  }

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.formAdmin);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.formAdmin);
  }

  isValidSendCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.formSend);
  }

  isValidSendInput(field: string){
    return ValidationsUtils.isValidInput(field, this.formSend);
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

  search() {
    if(this.formAdmin.valid) {
      const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
      const fechaInicialJ = this.formAdmin.value['fechaInicial'];
      const fechaFinalJ = this.formAdmin.value['fechaFinal'];
      let fechaInicialDate: Date = DateUtils.dateJsonToDate(fechaInicialJ);
      let fechaFinalDate: Date = DateUtils.dateJsonToDate(fechaFinalJ);
      const filtro = {
        fechaInicial: fechaInicialDate.toISOString().slice(0, 10),
        fechaFinal: fechaFinalDate.toISOString().slice(0, 10)
      };
      this.service.getRequestsDate(filtro, usuarioAutentificado.id).subscribe(
        (result: any) => {
          if (result === 'false') {
            this.serviceMessage.showMessage(this.propiedades['title.search'], this.propiedades['search.message.incorrect']);
          } else {
            this.requests = result;
          }
        }
      );
    } else {
      ValidationsUtils.validateAllFormFields(this.formAdmin);
    }
  }

  openModalSendResponse(content, request){
    this.requestSelected = request;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.ngOnInit();
    }, (reason) => {
      this.ngOnInit();
    });
  }

  sendResponse() {
    if(this.formSend.valid) {
      const responseRequest = {
        respuesta: this.formSend.value['mensaje']
      };
      this.service.sendResponse(responseRequest, this.requestSelected.id).subscribe(
        (result: any) => {
          if (result.status) {
            this.serviceMessage.showMessage(this.propiedades['title.modal'], this.propiedades['send.message.correct']);
          } else {
            this.serviceMessage.showMessage(this.propiedades['title.modal'], this.propiedades['send.message.incorrect']);
          }
        }
      );
    } else {
      ValidationsUtils.validateAllFormFields(this.formSend);
    }
  }

  /*gotoAnotherPage() {
    this.router.navigate(['/myPetsAdmin', 5]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }*/
}
