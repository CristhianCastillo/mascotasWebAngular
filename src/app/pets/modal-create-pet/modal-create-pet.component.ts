import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PetService } from '@services/pets/pet.service';
import * as CommonConst from '@constants/common';
import * as LoginConst from '@constants/login';
import { DateUtils } from '@utils/date-utils';
import { EnumUtils } from '@utils/enum-utils';
import { environment } from '@env/environment';
import {EnumEsterilizado, EnumGeneros} from '@constants/common';
import {ValidationsUtils} from '@utils/validations-utils';
import { MessagesUtils } from '@utils/messages-utils';

@Component({
  selector: 'app-modal-create-pet',
  templateUrl: './modal-create-pet.component.html',
  styleUrls: ['./modal-create-pet.component.css']
})
export class ModalCreatePetComponent implements OnInit {

  public typePets: any;
  public petForm: FormGroup;
  public selectedFile: File;
  public value: string;
  public propiedades: any;
  public variables: any;
  public convertImage: string;
  public listaGeneros: any;
  public listaSiNo: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
  , private modalService: NgbModal, public servicePet: PetService, private formBuilder: FormBuilder,
              public _DomSanitizer: DomSanitizer, private serviceMessage: MessagesUtils) {
    config.backdrop = 'static';
    this.value = '';
    this.selectedFile = null;
    this.propiedades = environment.components.pets;
    this.variables = environment;
    this.convertImage = CommonConst.IMAGEN_CONVERT_BASE_64;
    this.listaGeneros = EnumUtils.convertKeys(EnumGeneros);
    this.listaSiNo = EnumUtils.convertKeys(EnumEsterilizado);
    this.petForm = this.createForm();
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
    return this.formBuilder.group({
      nombre : ['', Validators.required],
      tipoMascota: ['', Validators.required],
      genero: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      raza: ['', Validators.required],
      esterilizado: ['', Validators.required],
      color: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onFileChange(event) {
    this.selectedFile = <File>event.target.files[0];
    if(this.selectedFile != null){
      if((this.selectedFile.type === CommonConst.IMAGE_JPEG_TYPE || this.selectedFile.type === CommonConst.IMAGE_PNG_TYPE)
        && this.selectedFile.size <= CommonConst.IMAGEN_MAX_SIZE) {
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.value = reader.result.split(',')[1];
        };
      } else {
        this.value = '';
        this.petForm.setValue['fotoMascota'] = '';
      }
    }
  }

  getData() {
    if(this.petForm.valid) {
      const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
      const fechaJ = this.petForm.value['fechaNacimiento'];
      let fechaDate: Date = DateUtils.dateJsonToDate(fechaJ);
      const mascota = {
        idUsuario: usuarioAutentificado.id,
        imagen: this.value,
        nombre: this.petForm.value['nombre'],
        idTipo: this.petForm.value['tipoMascota'],
        genero: this.petForm.value['genero'],
        fechaNacimiento: fechaDate.toISOString().slice(0, 10),
        raza: this.petForm.value['raza'],
        esterilizado: this.petForm.value['esterilizado'],
        color: this.petForm.value['color'],
        descripcion: this.petForm.value['descripcion']
      }
      this.createPet(mascota);
    } else {
      ValidationsUtils.validateAllFormFields(this.petForm);
    }
  }

  createPet(data) {
    this.servicePet.createPet(data).subscribe(
      (result: any) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.serviceMessage.showMessageSucces(this.propiedades['modal-create']['create.message.title'], this.propiedades['modal-create']['create.message.correct']);
        } else {
          this.serviceMessage.showMessageError(this.propiedades['modal-create']['create.message.title'], this.propiedades['modal-create']['create.message.incorrect']);
        }
      }, (error) => {
        console.log(error);
        this.serviceMessage.showMessageError();
      }
    );
  }
}
