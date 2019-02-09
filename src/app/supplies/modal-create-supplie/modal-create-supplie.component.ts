import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SuppliesService } from '@services/supplies/supplies.service';
import { DateUtils } from '@utils/date-utils';
import * as LoginConst from '@constants/login';
import {environment} from '@env/environment';
import * as CommonConst from '@constants/common';
import {EnumUtils} from '@utils/enum-utils';
import {MessagesUtils} from '@utils/messages-utils';
import {ValidationsUtils} from '@utils/validations-utils';

@Component({
  selector: 'app-modal-create-supplie',
  templateUrl: './modal-create-supplie.component.html',
  styleUrls: ['./modal-create-supplie.component.css']
})
export class ModalCreateSupplieComponent implements OnInit {

  public supplieForm: FormGroup;
  public typeSupplies: any;
  public propiedades: any;
  public variables: any;
  public listaUnidades: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig,
    private modalService: NgbModal, private formBuilder: FormBuilder, private service: SuppliesService,
              private messageService: MessagesUtils) {
    config.backdrop = 'static';
    this.propiedades = environment.components.supplies;
    this.variables = environment;
    this.listaUnidades = EnumUtils.convertKeys(CommonConst.EnumUnidades);
    this.supplieForm = this.createForm();
  }

  ngOnInit() {
    this.service.getTypeSupplies().subscribe(
      (result: any) => {
        if(result.code === CommonConst.SUCCESS_CODE){
          this.typeSupplies = result.result;
        } else {
          this.messageService.showMessageError(null, result.description);
        }
      },
      (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );
  }

  trackByFn(index, item) {
    return item.id;
  }

  isValidCheck(field: string) {
    return ValidationsUtils.isValidCheck(field, this.supplieForm);
  }

  isValidInput(field: string) {
    return ValidationsUtils.isValidInput(field, this.supplieForm);
  }

  private createForm() {
    return this.formBuilder.group({
      tipoSuministro: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      unidad: ['', Validators.required],
      fechaCompra: ['', Validators.required],
      precio: ['', Validators.required],
      proveedor: ['', Validators.required],
      comentarios: ['', Validators.required]
    });
  }

  getData() {
    if(this.supplieForm.valid) {
      const fechaJ = this.supplieForm.value['fechaCompra'];
      let fechaDate: Date = DateUtils.dateJsonToDate(fechaJ);
      const suministro = {
        idTipo: this.supplieForm.value['tipoSuministro'],
        nombre: this.supplieForm.value['nombre'],
        cantidad: this.supplieForm.value['cantidad'],
        unidad: this.supplieForm.value['unidad'],
        fechaCompra: fechaDate.toISOString().slice(0, 10),
        precio: this.supplieForm.value['precio'],
        proveedor: this.supplieForm.value['proveedor'],
        comentario: this.supplieForm.value['comentarios']
      }
      this.createSupplie(suministro);
    } else {
      ValidationsUtils.validateAllFormFields(this.supplieForm);
    }
  }

  createSupplie(suministro) {
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    this.service.addSupplie(suministro, usuarioAutentificado.id).subscribe(
      (result: any) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.messageService.showMessageSucces(this.propiedades['modal.create']['create.message.title'], this.propiedades['modal.create']['create.message.correct']);
        } else {
          this.messageService.showMessageError(this.propiedades['modal.create']['create.message.title'], this.propiedades['modal.create']['create.message.incorrect']);
        }
      }, (error) => {
        console.log(error);
        this.messageService.showMessageError();
      }
    );
  }
}
