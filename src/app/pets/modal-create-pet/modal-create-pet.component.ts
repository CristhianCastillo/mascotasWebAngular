import { Component, OnInit } from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
import { DomSanitizer } from '@angular/platform-browser';

import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PetService } from '../../services/pets/pet.service';
import { Mascota } from '../../models/Mascota';

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

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
  , private modalService: NgbModal, public servicePet: PetService, private formBuilder: FormBuilder,
              public _DomSanitizer: DomSanitizer) {
    config.backdrop = 'static';
    this.value = '';
    this.selectedFile = null;
    this.petForm = this.createForm();
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
    console.log(this.selectedFile);
    if(this.selectedFile != null){
      if(this.selectedFile.type === 'image/jpeg' && this.selectedFile.size <= 10000){
        let reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = () => {
          this.value = reader.result.split(',')[1];
        };
      }else {
        this.value = '';
        this.petForm.value['fotoMascota'] = '';
      }
    }
  }

  open(titulo, mensaje) {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    const fechaJ = this.petForm.value['fechaNacimiento'];
    //const esterilizado: boolean = (this.petForm.value['esterilizado'] === 'Si') ? true : false;
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, 1, 0, 0, 0))
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
    console.log(mascota);
    this.createPet(mascota, titulo, mensaje);
  }

  createPet(data, titulo, mensaje) {
    this.servicePet.createPet(data).subscribe(
      (result: any) => {
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
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido ingresar la mascota';
        }
      }
    );
  }
}
