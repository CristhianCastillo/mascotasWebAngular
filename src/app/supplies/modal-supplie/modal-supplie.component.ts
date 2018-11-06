import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {Suministro} from '../../models/Suministro';
import {DateConvert} from '../../models/DateConvert';
import { SuppliesService } from '../../services/supplies/supplies.service';

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

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal, public config: NgbModalConfig
    , private modalService: NgbModal, private formBuilder: FormBuilder, private service: SuppliesService) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.service.getTypeSupplies().subscribe(
      (data) => {
        console.log(data);
        this.typeSupplies = data;
      },
      (error) => {
        console.error(error);
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
    const fechaJ = this.supplieForm.value['fechaCompra'];
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, 1, 0, 0, 0))
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
    }
    this.updateSupplie(suministro);
  }

  updateSupplie(suministro) {
    console.log(suministro);
    this.service.updateSupplie(suministro, suministro.id).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Actualizar Suministro";
          modalRef.componentInstance.contenidoMensaje = "Suministro actualizado correctamente.";
        } else {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Actualizar Suministro";
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido actualizar el susministro.';
        }
      }
    );
  }

  deleteSupplie() {
    this.service.deleteSuppplie(this.suministroSeleccionado.id).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Eliminar Suministro";
          modalRef.componentInstance.contenidoMensaje = "Suministro eliminado correctamente.";
        } else {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Eliminar Suministro";
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido eliminar el susministro.';
        }
      }
    );
  }
}
