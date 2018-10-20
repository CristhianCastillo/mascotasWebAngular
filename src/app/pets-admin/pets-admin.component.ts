import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pets-admin',
  templateUrl: './pets-admin.component.html',
  styleUrls: ['./pets-admin.component.css']
})
export class PetsAdminComponent implements OnInit {

  public idCliente: number ;
  public fechaEvento: string ;

  public clientes: any = [
    {
      id: 1,
      nombreCliente: 'Cristhian Castillo',
      numerovisitas: 10,
      ultimaSolicitud: '2018-09-02 12:01 pm',
      mascotas: [
        {
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
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  public highlightRow(emp) {
    console.log(emp.id);
    this.idCliente = emp.id;
  }

  goToViewEvent(idCliente: number){
    this.router.navigate(['/myPetsAdmin', idCliente]);
  }
}
