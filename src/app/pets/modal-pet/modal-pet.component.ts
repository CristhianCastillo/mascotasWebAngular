import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { MessagesUtils } from '@utils/messages-utils';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PetService } from '@services/pets/pet.service';
import { Mascota } from '@models/Mascota';
import { DateConvert } from '@models/DateConvert';
import * as CommonConst from '@constants/common';
import { DateUtils } from '@utils/date-utils';
import { environment } from '@env/environment';
import { EnumUtils } from '@utils/enum-utils';
import { EnumGeneros } from '@constants/common';
import { EnumEsterilizado } from '@constants/common';
import {ValidationsUtils} from '@utils/validations-utils';

@Component({
  selector: 'app-modal-pet',
  templateUrl: './modal-pet.component.html',
  styleUrls: ['./modal-pet.component.css']
})
export class ModalPetComponent implements OnInit {

  @Input() mascota: Mascota;
  public typePets: any;
  public petForm: FormGroup;
  public fechaNacimiento: DateConvert;
  public modeloNuevo: Date;
  public selectedFile: File;
  public propiedades: any;
  public variables: any;
  public convertImage: string;
  public listaGeneros: any;
  public listaSiNo: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal, public servicePet: PetService, private formBuilder: FormBuilder,
              public _DomSanitizer: DomSanitizer, private serviceMessage: MessagesUtils) {
    config.backdrop = 'static';
    this.propiedades = environment.components.pets;
    this.variables = environment;
    this.convertImage = CommonConst.IMAGEN_CONVERT_BASE_64;
    this.listaGeneros = EnumUtils.convertKeys(EnumGeneros);
    this.listaSiNo = EnumUtils.convertKeys(EnumEsterilizado);
  }

  ngOnInit() {
    this.servicePet.getTypePets().subscribe(
      (result: any) => {
        if(result.code === CommonConst.SUCCESS_CODE){
          this.typePets = result.result;
        } else {
          this.serviceMessage.showMessageError(null, result.description);
        }
      },
      (error) => {
        console.error(error);
        this.serviceMessage.showMessageError();
      }
    );
    this.fechaNacimiento = new DateConvert();
    this.modeloNuevo = new Date(this.mascota.fechaNacimiento);
    this.fechaNacimiento.year = this.modeloNuevo.getUTCFullYear();
    this.fechaNacimiento.month = (this.modeloNuevo.getUTCMonth() + 1);
    this.fechaNacimiento.day = this.modeloNuevo.getUTCDate();
    this.petForm = this.createForm();
  }

  trackByFn(index, item) {
    return item.id;
  }

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.petForm);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.petForm);
  }

  private createForm() {
    const esterilizado: string = this.mascota.esterilizado === true ? 'Si': 'No';
    return this.formBuilder.group({
      nombre : [this.mascota.nombre + '', Validators.required],
      tipoMascota: [this.mascota.idTipo, Validators.required],
      genero: [this.mascota.genero, Validators.required],
      fechaNacimiento: [this.fechaNacimiento, Validators.required],
      raza: [this.mascota.raza, Validators.required],
      esterilizado: [esterilizado, Validators.required],
      color: [this.mascota.color, Validators.required],
      descripcion: [this.mascota.descripcion, Validators.required]
    });
  }

  changeURL(newUrl) {
    this.selectedFile = <File>newUrl.target.files[0];
    if(this.selectedFile != null) {
      if((this.selectedFile.type === CommonConst.IMAGE_JPEG_TYPE || this.selectedFile.type === CommonConst.IMAGE_PNG_TYPE) &&
        this.selectedFile.size <= CommonConst.IMAGEN_MAX_SIZE) {
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.mascota.imagen = reader.result.split(',')[1];
        };
      } else {
        this.mascota.imagen = '';
        this.petForm.setValue['fotoMascota'] = '';
      }
    }
  }

  openModalUpdate() {
    if(this.petForm.valid) {
      const fechaJ = this.petForm.value['fechaNacimiento'];
      let fechaDate: Date = DateUtils.dateJsonToDate(fechaJ);
      const mascota = {
        imagen: this.mascota.imagen,
        nombre: this.petForm.value['nombre'],
        idTipo: this.petForm.value['tipoMascota'],
        genero: this.petForm.value['genero'],
        fechaNacimiento: fechaDate.toISOString().slice(0, 10),
        raza: this.petForm.value['raza'],
        esterilizado: this.petForm.value['esterilizado'],
        color: this.petForm.value['color'],
        descripcion: this.petForm.value['descripcion']
      }
      this.updatePet(mascota);
    } else {
      ValidationsUtils.validateAllFormFields(this.petForm);
    }
  }

  updatePet(data) {
    this.servicePet.updatePet(this.mascota.id, data).subscribe(
      (result: any ) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.serviceMessage.showMessageSucces(this.propiedades['modal-search']['update.message.title'], this.propiedades['modal-search']['update.message.correct']);
        } else {
          this.serviceMessage.showMessageError(this.propiedades['modal-search']['update.message.title'], this.propiedades['modal-search']['update.message.incorrect']);
        }
      }, (error) => {
        this.serviceMessage.showMessageError();
      }
    );
  }

  openModalDelete() {
    this.servicePet.deletePet(this.mascota.id).subscribe(
      (result: any) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.serviceMessage.showMessageSucces(this.propiedades['modal-search']['delete.message.title'], this.propiedades['modal-search']['delete.message.correct']);
        } else {
          this.serviceMessage.showMessageError(this.propiedades['modal-search']['delete.message.title'], this.propiedades['modal-search']['delete.message.incorrect']);
        }
      }, (error) => {
        this.serviceMessage.showMessageError();
      }
    );
  }
}
