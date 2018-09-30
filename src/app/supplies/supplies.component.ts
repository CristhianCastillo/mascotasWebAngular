import {Component,  OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateSupplieComponent } from './modal-create-supplie/modal-create-supplie.component';
import { ModalSupplieComponent } from './modal-supplie/modal-supplie.component';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {
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
          tienda: 'Veterinaria Grecia',
          consumoDiario: '1 por semana',
          comentarios: 'Es el juguete favortio.'
        },
        {
          nombreSuministro: 'Pelota de lana',
          cantidadSuministro: 8,
          unidadMedida: 'Unidades',
          fechaCompra: '2016-08-08',
          precio: 100.9,
          tienda: 'Veterinaria Past',
          consumoDiario: '1 por semana',
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
          tienda: 'Veterinaria Grecia',
          consumoDiario: '1 Kg por semana',
          comentarios: 'Comida para los cachorros'
        },
        {
          nombreSuministro: 'Purina gatitos',
          cantidadSuministro: 10.3,
          unidadMedida: 'Kg',
          fechaCompra: '2018-08-08',
          precio: 50.0,
          tienda: 'Veterinaria Past',
          consumoDiario: '0.5 Kg por semana',
          comentarios: 'Comida para los gatitos.'
        }
      ]
    }
  ];

  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService) { }

  public highlightRow(emp) {
    console.log(emp.nombreSuministro);
    this.nombreSuministro = emp.nombreSuministro;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }

  goToCreateSupplie() {
    const modalRef = this.modalService.open(ModalCreateSupplieComponent);
  }

  goToViewSupplie(suministro) {
    const modalRef = this.modalService.open(ModalSupplieComponent);
    modalRef.componentInstance.suministroSeleccionado = suministro;
  }

}
