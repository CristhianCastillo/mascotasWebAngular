import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-create-supplie-admin',
  templateUrl: './modal-create-supplie-admin.component.html',
  styleUrls: ['./modal-create-supplie-admin.component.css']
})
export class ModalCreateSupplieAdminComponent implements OnInit {

  public supplieForm: FormGroup;
  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal, private formBuilder: FormBuilder) {
    config.backdrop = 'static';
    this.supplieForm = this.createForm();
  }

  ngOnInit() {
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
      consumoDiario: ['', Validators.required],
      comentarios: ['', Validators.required]
    });
  }

  getData(){
    const fechaJ = this.supplieForm.value['fechaCompra'];
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, 1, 0, 0, 0))
    const suministro = {
      tipoSuministro: this.supplieForm.value['tipoSuministro'],
      nombre: this.supplieForm.value['nombre'],
      cantidad: this.supplieForm.value['cantidad'],
      unidad: this.supplieForm.value['unidad'],
      fechaCompra: fechaDate.toISOString().slice(0, 10),
      precio: this.supplieForm.value['precio'],
      proveedor: this.supplieForm.value['proveedor'],
      consumoDiario: this.supplieForm.value['consumoDiario'],
      comentarios: this.supplieForm.value['comentarios'],
      idUsuario: 1
    }
    this.createSupplie(suministro);
  }

  createSupplie(suministro) {
    console.log(suministro);
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = "Registrar suministro";
    modalRef.componentInstance.contenidoMensaje = "Suministro registrado correctamente";
    // this.servicePet.createPet(data).subscribe(
    //   (result: Mascota) => {
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
    //       modalRef.componentInstance.contenidoMensaje = 'No se ha podido ingresar la mascota';
    //     }
    //   }
    // );
  }
}
