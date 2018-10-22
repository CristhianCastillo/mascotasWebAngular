import { Component, Input, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalOutMessageComponent} from '../../modal-out-message/modal-out-message.component';

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
  public petForm: FormGroup;
  public fechaNacimiento: DateConvert;
  public modeloNuevo: Date;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal, public servicePet: PetService, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    console.log(this.mascota);
    this.fechaNacimiento = new DateConvert();
    this.modeloNuevo = new Date(this.mascota.fechaNacimiento);
    this.fechaNacimiento.year = this.modeloNuevo.getUTCFullYear();
    this.fechaNacimiento.month = (this.modeloNuevo.getUTCMonth() + 1);
    this.fechaNacimiento.day = this.modeloNuevo.getUTCDate();
    console.log(this.mascota);
    this.petForm = this.createForm();
  }

  private createForm() {
    return this.formBuilder.group({
      fotoMascota: [''],
      nombre : [this.mascota.nombre + '', Validators.required],
      tipoMascota: [this.mascota.tipoMascota, Validators.required],
      genero: [this.mascota.genero, Validators.required],
      fechaNacimiento: [this.fechaNacimiento, Validators.required],
      raza: [this.mascota.raza, Validators.required],
      esterilizado: [this.mascota.esterilizado, Validators.required],
      color: [this.mascota.color, Validators.required],
      descripcion: [this.mascota.descripcion, Validators.required]
    });
  }

  changeURL(newUrl) {
    if (newUrl.target.files && newUrl.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (newUrl: ProgressEvent) => {
        this.mascota.imagen = (<FileReader>newUrl.target).result;
      }
      reader.readAsDataURL(newUrl.target.files[0]);
    }
  }

  openModalUpdate(titulo, mensaje) {
    const fechaJ = this.petForm.value['fechaNacimiento'];
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, 1, 0, 0, 0))
    console.log(fechaDate.toISOString().slice(0, 10));
    const mascota = {
      imagen: '../../assets/imgs/pet - default.png',
      nombre: this.petForm.value['nombre'],
      tipoMascota: this.petForm.value['tipoMascota'],
      genero: this.petForm.value['genero'],
      fechaNacimiento: fechaDate.toISOString().slice(0, 10),
      raza: this.petForm.value['raza'],
      esterilizado: this.petForm.value['esterilizado'],
      color: this.petForm.value['color'],
      descripcion: this.petForm.value['descripcion'],
      idDuenio: 2
    }
    this.updatePet(mascota, titulo, mensaje);
  }

  updatePet(data, titulo, mensaje) {
    this.servicePet.updatePet(this.mascota.id, data).subscribe(
      (result: boolean ) => {
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
