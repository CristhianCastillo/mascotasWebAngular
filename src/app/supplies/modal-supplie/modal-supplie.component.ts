import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {Suministro} from '@models/Suministro';
import {DateConvert} from '@models/DateConvert';
import { SuppliesService } from '@services/supplies/supplies.service';
import { DateUtils } from '@utils/date-utils';
import {environment} from '@env/environment';
import * as CommonConst from '@constants/common';
import {EnumUtils} from '@utils/enum-utils';
import {MessagesUtils} from '@utils/messages-utils';
import {ValidationsUtils} from '@utils/validations-utils';

@Component({
  selector: 'app-modal-supplie',
  templateUrl: './modal-supplie.component.html',
  styleUrls: ['./modal-supplie.component.css']
})
export class ModalSupplieComponent implements OnInit {

  @Input() suministroSeleccionado: Suministro;
  public supplieForm: FormGroup;
  public fechaJs: Date;
  public fechaCompra: DateConvert;
  public typeSupplies: any;
  public propiedades: any;
  public variables: any;
  public listaUnidades: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal, public config: NgbModalConfig
    , private modalService: NgbModal, private formBuilder: FormBuilder, private service: SuppliesService,
              private messageService: MessagesUtils) {
    config.backdrop = 'static';
    this.propiedades = environment.components.supplies;
    this.variables = environment;
    this.listaUnidades = EnumUtils.convertKeys(CommonConst.EnumUnidades);
  }

  ngOnInit() {
    this.service.getTypeSupplies().subscribe(
      (result: any) => {
        if(result.code === CommonConst.SUCCESS_CODE){
          this.typeSupplies = result.result;
        } else {
          this.messageService.showMessageError(null, result.description);
        }
      }, (error) => {
        console.error(error);
        this.messageService.showMessageError();
      }
    );
    //Fecha Evento
    this.fechaCompra = new DateConvert();
    this.fechaJs = new Date(this.suministroSeleccionado.fecha);
    this.fechaCompra.year = this.fechaJs.getUTCFullYear();
    this.fechaCompra.month = (this.fechaJs.getUTCMonth() + 1);
    this.fechaCompra.day = this.fechaJs.getUTCDate();
    this.supplieForm = this.createForm();
  }

  trackByFn(index, item) {
    return item.id;
  }

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.supplieForm);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.supplieForm);
  }

  private createForm() {
    return this.formBuilder.group({
      tipoSuministro: [this.suministroSeleccionado.idTipo, Validators.required],
      nombre: [this.suministroSeleccionado.nombre, Validators.required],
      cantidad: [this.suministroSeleccionado.cantidad, Validators.required],
      unidad: [this.suministroSeleccionado.unidadMedida, Validators.required],
      fechaCompra: [this.fechaCompra, Validators.required],
      precio: [this.suministroSeleccionado.precio, Validators.required],
      proveedor: [this.suministroSeleccionado.proveedor, Validators.required],
      comentarios: [this.suministroSeleccionado.comentario, Validators.required]
    });
  }

  getData() {
    if(this.supplieForm.valid) {
      const fechaJ = this.supplieForm.value['fechaCompra'];
      let fechaDate: Date = DateUtils.dateJsonToDate(fechaJ);
      const suministro = {
        id: this.suministroSeleccionado.id,
        idTipo: this.supplieForm.value['tipoSuministro'],
        nombre: this.supplieForm.value['nombre'],
        cantidad: this.supplieForm.value['cantidad'],
        unidad: this.supplieForm.value['unidad'],
        fechaCompra: fechaDate.toISOString().slice(0, 10),
        precio: this.supplieForm.value['precio'],
        proveedor: this.supplieForm.value['proveedor'],
        comentario: this.supplieForm.value['comentarios'],
      };
      this.updateSupplie(suministro);
    } else {
      ValidationsUtils.validateAllFormFields(this.supplieForm);
    }
  }

  updateSupplie(suministro) {
    this.service.updateSupplie(suministro, suministro.id).subscribe(
      (result: any) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.messageService.showMessageSucces(this.propiedades['modal.search']['update.message.title'], this.propiedades['modal.search']['update.message.correct']);
        } else {
          this.messageService.showMessageError(this.propiedades['modal.search']['update.message.title'], this.propiedades['modal.search']['update.message.incorrect']);
        }
      }, (error) => {
          console.log(error);
          this.messageService.showMessageError();
      }
    );
  }

  deleteSupplie() {
    this.service.deleteSuppplie(this.suministroSeleccionado.id).subscribe(
      (result: any) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.messageService.showMessageSucces(this.propiedades['modal.search']['delete.message.title'], this.propiedades['modal.search']['delete.message.correct']);
        } else {
          this.messageService.showMessageError(this.propiedades['modal.search']['delete.message.title'], this.propiedades['modal.search']['delete.message.incorrect']);
        }
      }, (error) => {
          console.log(error);
          this.messageService.showMessageError();
      }
    );
  }
}
