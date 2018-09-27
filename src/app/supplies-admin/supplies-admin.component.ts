import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalCreateSupplieAdminComponent} from './modal-create-supplie-admin/modal-create-supplie-admin.component';
import {ModalSupplieAdminComponent} from './modal-supplie-admin/modal-supplie-admin.component';

@Component({
  selector: 'app-supplies-admin',
  templateUrl: './supplies-admin.component.html',
  styleUrls: ['./supplies-admin.component.css']
})
export class SuppliesAdminComponent implements OnInit {
  public nombreSuministro: string ;
  suministros = [
    {
      nombreTipoSuministro: 'Juguetes',
      detales: [
        {
          nombreSuministro: 'Hueso',
          cantidadSuministro: 3,
          unidadMedida: 'Unidades',
          fechaCompra: '2018-08-08',
          precio: 89.9,
          proveedor: 'Veterinaria Grecia',
          comentarios: 'Es el juguete favortio.'
        },
        {
          nombreSuministro: 'Pelota de lana',
          cantidadSuministro: 8,
          unidadMedida: 'Unidades',
          fechaCompra: '2016-08-08',
          precio: 100.9,
          proveedor: 'Veterinaria Past',
          comentarios: 'Es el juguete favortio.'
        }
      ]
    },
    {
      nombreTipoSuministro: 'Alimento',
      detales: [
        {
          nombreSuministro: 'Purina cachorros',
          cantidadSuministro: 25.5,
          unidadMedida: 'Kg',
          fechaCompra: '2018-09-08',
          precio: 100.0,
          proveedor: 'Veterinaria Grecia',
          comentarios: 'Comida para los cachorros'
        },
        {
          nombreSuministro: 'Purina gatitos',
          cantidadSuministro: 10.3,
          unidadMedida: 'Kg',
          fechaCompra: '2018-08-08',
          precio: 50.0,
          proveedor: 'Veterinaria Past',
          comentarios: 'Comida para los gatitos.'
        }
      ]
    }
  ];
  constructor(private modalService: NgbModal) { }

  public highlightRow(emp) {
    console.log(emp.nombreSuministro);
    this.nombreSuministro = emp.nombreSuministro;
  }

  ngOnInit() {
  }

  goToCreateSupplie() {
    const modalRef = this.modalService.open(ModalCreateSupplieAdminComponent);
  }

  goToViewSupplie(suministro) {
    console.log(suministro);
    const modalRef = this.modalService.open(ModalSupplieAdminComponent);
    modalRef.componentInstance.suministroSeleccionado = suministro;
  }

}
