import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SuppliesService } from '../../services/supplies/supplies.service';

@Component({
  selector: 'app-modal-create-supplie',
  templateUrl: './modal-create-supplie.component.html',
  styleUrls: ['./modal-create-supplie.component.css']
})
export class ModalCreateSupplieComponent implements OnInit {

  public supplieForm: FormGroup;
  public typeSupplies: any;

  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig,
    private modalService: NgbModal, private formBuilder: FormBuilder, private service: SuppliesService) {
    config.backdrop = 'static';
    this.supplieForm = this.createForm();
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
      comentarios: ['', Validators.required]
    });
  }

  getData(){
    const fechaJ = this.supplieForm.value['fechaCompra'];
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, 1, 0, 0, 0))
    const suministro = {
      idTipo: this.supplieForm.value['tipoSuministro'],
      nombre: this.supplieForm.value['nombre'],
      cantidad: this.supplieForm.value['cantidad'],
      unidad: this.supplieForm.value['unidad'],
      fechaCompra: fechaDate.toISOString().slice(0, 10),
      precio: this.supplieForm.value['precio'],
      proveedor: this.supplieForm.value['proveedor'],
      comentario: this.supplieForm.value['comentarios']
    }
    this.createSupplie(suministro);
  }

  createSupplie(suministro) {
    console.log(suministro);
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    this.service.addSupplie(suministro, usuarioAutentificado.id).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Agregar Suministro";
          modalRef.componentInstance.contenidoMensaje = "Suministro agregado correctamente."
        } else {
          this.modalService.dismissAll();
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = "Agregar Suministro";
          modalRef.componentInstance.contenidoMensaje = 'No se ha podido agregar el producto.';
        }
      }
    );
  }
}
