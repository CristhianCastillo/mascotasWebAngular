import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPetsAdminComponent } from '../modal-pets-admin/modal-pets-admin.component';

@Component({
  selector: 'app-pets-admin-pets',
  templateUrl: './pets-admin-pets.component.html',
  styleUrls: ['./pets-admin-pets.component.css']
})
export class PetsAdminPetsComponent implements OnInit {

  public idMascota: number;
  private sub: any;
  public clientes: any = [
    {
      id: 1,
      nombreCliente: 'Cristhian Castillo',
      numerovisitas: 10,
      ultimaSolicitud: '2018-09-02 12:01 pm',
      mascotas: [
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

      ]
    },
    {
      id: 2,
      nombreCliente: 'Juan Castillo',
      numerovisitas: 5,
      ultimaSolicitud: '2018-09-02 12:01 pm',
      mascotas: [
        {
          id: 3,
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
          id: 4,
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
      ]
    }
  ];

  constructor(private modalService: NgbModal, private route: ActivatedRoute) { }

  ngOnInit() {
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
