import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PetService } from '../../services/pets/pet.service';
import { Mascota } from '../../models/Mascota';

@Component({
  selector: 'app-modal-create-pet',
  templateUrl: './modal-create-pet.component.html',
  styleUrls: ['./modal-create-pet.component.css']
})
export class ModalCreatePetComponent implements OnInit {

  public petForm: FormGroup;
  public selectedFile: File;
  public value: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
  , private modalService: NgbModal, public servicePet: PetService, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    this.selectedFile = null;
    this.petForm = this.createForm();
  }

  ngOnInit() {
  }

  private createForm() {
    return this.formBuilder.group({
      fotoMascota: ['', Validators.required],
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
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.value = reader.result.split(',')[1];
    };
  }

  open(titulo, mensaje) {
    const fechaJ = this.petForm.value['fechaNacimiento'];
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, 1, 0, 0, 0))
    const mascota = {
      imagen: this.value,
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
    console.log(mascota);
    //this.createPet(mascota, titulo, mensaje);
  }

  createPet(data, titulo, mensaje) {
    this.servicePet.createPet(data).subscribe(
      (result: Mascota) => {
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
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido ingresar la mascota';
        }
      }
    );
  }
}
