import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../modal-out-message/modal-out-message.component';
import { ScrollTopService } from '../services/scroll-top.service';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import {HourConvert} from '../models/HourConvert';

@Component({
  selector: 'app-establishments',
  templateUrl: './establishments.component.html',
  styleUrls: ['./establishments.component.css']
})
export class EstablishmentsComponent implements OnInit {

  public dropdownList = [];
  public dropdownSettings = {};
  public establishmentForm: FormGroup;
  public horaInicial: HourConvert;
  public horaFinal: HourConvert;
  public datosEstablecimiento: any = {
      id: '23123',
      nit: 'QWE123TYU456',
      nombre: 'Veterinaria Grecia',
      telefono: '321312332',
      direccion: 'Crr 35 F 545 sur',
      correo: 'veterinariaGrecia@gmail.com',
      paginaWeb: 'www.veterinariagrecia.com',
      servicios: ['Peluqueria'],
      horarios: 'Establecido',
      horaInicial: '08:00',
      horaFinal: '22:00',
      descripcion: 'Veterinaria para todo tipo de mascotas',
      habilitado: true
    } ;
  constructor(public config: NgbModalConfig, private modalService: NgbModal, private scrollTop: ScrollTopService,
              private formBuilder: FormBuilder) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();

    this.dropdownList = [
      // { item_id: 1, item_text: 'Mumbai' },
      // { item_id: 2, item_text: 'Bangaluru' },
      // { item_id: 3, item_text: 'Pune' },
      // { item_id: 4, item_text: 'Navsari' },
      // { item_id: 5, item_text: 'New Delhi' }
      'Hospital', 'Tienda', 'Comida', 'Peluqueria'
    ];

    this.dropdownSettings = {
      singleSelection: false,
      //idField: 'item_id',
      //textField: 'item_text',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Desmarcar Todos',
      itemsShowLimit: 3,
      //allowSearchFilter: true
    };

    let horaInicialPartes: string[] = this.datosEstablecimiento.horaInicial.split(':');
    let horaFinalPartes: string[] = this.datosEstablecimiento.horaFinal.split(':');
    console.log(this.horaInicial);
    console.log(this.horaFinal);

    this.horaInicial = new HourConvert();
    this.horaInicial.hour = Number(horaInicialPartes[0]);
    this.horaInicial.minute = Number(horaInicialPartes[1]);

    this.horaFinal = new HourConvert();
    this.horaFinal.hour = Number(horaFinalPartes[0]);
    this.horaFinal.minute = Number(horaFinalPartes[1]);

    this.establishmentForm = this.createForm();
  }

  private createForm() {
    return this.formBuilder.group({
      nombre: [this.datosEstablecimiento.nombre, Validators.required],
      telefono: [this.datosEstablecimiento.telefono],
      direccion: [this.datosEstablecimiento.direccion],
      correo: [this.datosEstablecimiento.correo],
      paginaWeb: [this.datosEstablecimiento.paginaWeb],
      servicios: [this.datosEstablecimiento.servicios, Validators.required],
      horarios: [this.datosEstablecimiento.horarios],
      horaInicial: [this.horaInicial],
      horaFinal: [this.horaFinal],
      descripcion: [this.datosEstablecimiento.descripcion, Validators.required]
    });
  }

  getData(){
    const horaInicial = this.establishmentForm.value['horaInicial'];
    const horaFinal = this.establishmentForm.value['horaFinal'];
    let fechaInicialDate: Date = new Date(Date.UTC(2000, 2, 2, horaInicial.hour, horaInicial.minute, 0, 0));
    let fechaFinalDate: Date = new Date(Date.UTC(2000, 2, 2, horaFinal.hour, horaFinal.minute, 0, 0));
    console.log(fechaInicialDate.toISOString().slice(11, 16));
    console.log(fechaFinalDate.toISOString().slice(11, 16));

    const establecimiento = {
      nombre: this.establishmentForm.value['nombre'],
      telefono: this.establishmentForm.value['telefono'],
      direccion: this.establishmentForm.value['direccion'],
      correo: this.establishmentForm.value['correo'],
      paginaWeb: this.establishmentForm.value['paginaWeb'],
      servicios: this.establishmentForm.value['servicios'],
      horarios: this.establishmentForm.value['horarios'],
      horaInicial: fechaInicialDate.toISOString().slice(11, 16),
      horaFinal: fechaFinalDate.toISOString().slice(11, 16),
      descripcion: this.establishmentForm.value['descripcion']
    }
    this.updateEstablishment(establecimiento);
  }

  updateEstablishment(establecimiento){
    console.log(establecimiento);
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = 'Establecimiento';
    modalRef.componentInstance.contenidoMensaje = 'Establecimiento actualizado correctamente';

    // this.servicePet.updatePet(this.mascota.id, data).subscribe(
    //   (result: boolean ) => {
    //     console.log(result);
    //     if (result) {
    //       this.modalService.dismissAll();
    //       const modalRef = this.modalService.open(ModalOutMessageComponent);
    //       modalRef.componentInstance.tituloMensaje = titulo;
    //       modalRef.componentInstance.contenidoMensaje = mensaje;
    //     } else {
    //       this.modalService.dismissAll();
    //       const modalRef = this.modalService.open(ModalOutMessageComponent);
    //       modalRef.componentInstance.tituloMensaje = titulo;
    //       modalRef.componentInstance.contenidoMensaje = 'No se ha podido actualizar la mascota';
    //     }
    //   }
    // );
  }
}
