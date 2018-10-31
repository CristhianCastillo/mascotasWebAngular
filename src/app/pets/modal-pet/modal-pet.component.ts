import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalOutMessageComponent} from '../../modal-out-message/modal-out-message.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PetService } from '../../services/pets/pet.service';
import {Mascota} from '../../models/Mascota';
import {DateConvert} from '../../models/DateConvert';

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

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal, public servicePet: PetService, private formBuilder: FormBuilder,
              public _DomSanitizer: DomSanitizer) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.servicePet.getTypePets().subscribe(
      (data) => {
        console.log(data);
        this.typePets = data;
      },
      (error) => {
        console.error(error);
      }
    );
    //console.log(this.mascota);
    this.fechaNacimiento = new DateConvert();
    this.modeloNuevo = new Date(this.mascota.fechaNacimiento);
    this.fechaNacimiento.year = this.modeloNuevo.getUTCFullYear();
    this.fechaNacimiento.month = (this.modeloNuevo.getUTCMonth() + 1);
    this.fechaNacimiento.day = this.modeloNuevo.getUTCDate();
    //console.log(this.mascota);
    this.petForm = this.createForm();
  }

  private createForm() {
    const esterilizado: string = this.mascota.esterilizado === true ? 'Si': 'No';
    return this.formBuilder.group({
      fotoMascota: [''],
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
    console.log("Cambiando de imagen......")
    this.selectedFile = <File>newUrl.target.files[0];
    if(this.selectedFile.size <= 10000) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = () => {
        this.mascota.imagen = reader.result.split(',')[1];
      }

    } else {
      this.mascota.imagen = '';
      this.petForm.value['fotoMascota'] = '';
    }
    // if (newUrl.target.files && newUrl.target.files[0])
    // {
    //   let reader = new FileReader();
    //   reader.onload = (newUrl: ProgressEvent) => {
    //     this.value = reader.result.split(',')[1];
    //     this.mascota.imagen = (<FileReader>newUrl.target).result;
    //   }
    //   reader.readAsDataURL(newUrl.target.files[0]);
    // }
  }

  openModalUpdate(titulo, mensaje) {
    console.log("Actualizando")
    const fechaJ = this.petForm.value['fechaNacimiento'];
    //const esterilizado: boolean = (this.petForm.value['esterilizado'] === 'Si') ? true : false;
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, 1, 0, 0, 0))
    //console.log(fechaDate.toISOString().slice(0, 10));
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
    console.log(mascota);
    this.updatePet(mascota, titulo, mensaje);
  }

  updatePet(data, titulo, mensaje) {
    this.servicePet.updatePet(this.mascota.id, data).subscribe(
      (result: any ) => {
        console.log(result);
        if (result.status) {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = titulo;
          modalRef.componentInstance.contenidoMensaje = mensaje;
        } else {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = titulo;
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido actualizar la mascota';
        }
      }
    );
  }

  openModalConfirm(titulo, mensaje) {
    this.servicePet.deletePet(this.mascota.id).subscribe(
      (result: boolean) => {
        console.log(result);
        if (result) {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = titulo;
          modalRef.componentInstance.contenidoMensaje = mensaje;
        } else {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = titulo;
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido eliminar la mascota';
        }
      }
    );
  }
}
