import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPetsAdminComponent } from '../../modal-pets-admin/modal-pets-admin.component';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Component({
  selector: 'app-pets-admin-owner',
  templateUrl: './pets-admin-owner.component.html',
  styleUrls: ['./pets-admin-owner.component.css']
})
export class PetsAdminOwnerComponent implements OnInit {

  public idMascota: number;
  public idCliente: string;
  public nombreCliente: string;
  private sub: any;
  public mascotas: any = [
    {
      id: 1,
      nombreMascota: 'Maxi',
      ultimaSolicitud: '2018-09-02 12:01 pm',
      servicios: [
        {
          tipoServicio: 'Peluqueria',
          estado: 'Finalizada',
          fecha: '2018-07-02 12:01 pm',
          mensaje: 'Hola, me podrias atender a las 2:00pm??.. Gracias!!'
        },
        {
          tipoServicio: 'Baño',
          estado: 'No Finalizada',
          fecha: '2018-09-02 12:01 pm',
          mensaje: 'Hola, me podrias atender a las 10:00am??.. Gracias!!'
        }
        ]
    },
    {
      id: 2,
      nombreMascota: 'Gatita',
      ultimaSolicitud: '2018-05-02 14:01 pm',
      servicios: [
        {
          tipoServicio: 'Peluqueria',
          estado: 'Finalizada',
          fecha: '2018-07-02 12:01 pm',
          mensaje: 'Hola, me podrias atender a las 2:00pm??.. Gracias!!'
        },
        {
          tipoServicio: 'Baño',
          estado: 'No Finalizada',
          fecha: '2018-09-02 12:01 pm',
          mensaje: 'Hola, me podrias atender a las 10:00am??.. Gracias!!'
        }
        ]
    }
    ];


  constructor(private modalService: NgbModal, private route: ActivatedRoute) {
    this.nombreCliente = 'Cristhian';
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.idCliente = params['id'];
    });
  }

  public highlightRow(emp) {
    console.log(emp.id);
    this.idMascota = emp.id;
  }

  goViewCalendarPet(servicios: any) {
    const modalRef = this.modalService.open(ModalPetsAdminComponent, {size: 'lg'});
    modalRef.componentInstance.servicios = servicios;
  }

}
