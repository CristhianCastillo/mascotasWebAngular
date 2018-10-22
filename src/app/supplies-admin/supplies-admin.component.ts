import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalCreateSupplieAdminComponent} from './modal-create-supplie-admin/modal-create-supplie-admin.component';
import {ModalSupplieAdminComponent} from './modal-supplie-admin/modal-supplie-admin.component';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-supplies-admin',
  templateUrl: './supplies-admin.component.html',
  styleUrls: ['./supplies-admin.component.css']
})
export class SuppliesAdminComponent implements OnInit {
  public nombreSuministro: string ;
  public suministros: any = [
    {
      nombreTipoSuministro: 'Juguetes',
      detalles: [
        {
          id: 1,
          tipoSuministro: 'Juguetes',
          nombre: 'Hueso',
          cantidad: 3,
          unidadMedida: 'Unidades',
          fecha: '2018-08-08',
          precio: 89.9,
          proveedor: 'Veterinaria Grecia',
          consumoDiario: '1 por semana',
          comentario: 'Es el juguete favortio.',
          idUsuario: 1
        },
        {
          id: 2,
          tipoSuministro: 'Juguetes',
          nombre: 'Pelota de lana',
          cantidad: 8,
          unidadMedida: 'Unidades',
          fecha: '2016-08-08',
          precio: 100.9,
          proveedor: 'Veterinaria Past',
          consumoDiario: '1 por semana',
          comentario: 'Es el juguete favortio.',
          idUsuario: 1
        }
      ]
    },
    {
      nombreTipoSuministro: 'Alimento',
      detalles: [
        {
          id: 3,
          tipoSuministro: 'Alimento',
          nombre: 'Purina cachorros',
          cantidad: 25.5,
          unidadMedida: 'Kg',
          fecha: '2018-09-08',
          precio: 100.0,
          proveedor: 'Veterinaria Grecia',
          consumoDiario: '1 Kg por semana',
          comentario: 'Comida para los cachorros',
          idUsuario: 1
        },
        {
          id: 4,
          tipoSuministro: 'Alimento',
          nombre: 'Purina gatitos',
          cantidad: 10.3,
          unidadMedida: 'Kg',
          fecha: '2018-08-08',
          precio: 50.0,
          proveedor: 'Veterinaria Past',
          consumoDiario: '0.5 Kg por semana',
          comentario: 'Comida para los gatitos.',
          idUsuario: 1
        }
      ]
    }
  ];

  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService) { }

  public highlightRow(emp) {
    console.log(emp.nombre);
    this.nombreSuministro = emp.nombre;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
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
