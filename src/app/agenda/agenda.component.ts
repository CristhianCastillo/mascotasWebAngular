import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateAgendaComponent } from './modal-create-agenda/modal-create-agenda.component';
import { ModalAgendaComponent } from './modal-agenda/modal-agenda.component';
import { ScrollTopService } from '../services/scroll-top.service';
import {Cita} from '../models/Cita';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  public idEvento: number ;
  public fechaEvento: string ;
  public agenda = [
    {
      idMascota: 1,
      nombre: 'Muñeca',
      citas: [
        {
          id: 1,
          nombre: "Corte de pelo",
          ubicacion: "Kr 45 F",
          tipoActividad: "Peluqueria",
          fechaEvento: "2018-01-01",
          horaEvento: "12:00",
          descripcionEvento: "Corte de pelo semestral."
        },
        {
          id: 2,
          nombre: "Vacuna anual",
          ubicacion: "Calle 34 F 34",
          tipoActividad: "Vacuna",
          fechaEvento: "2019-05-01",
          horaEvento: "12:00",
          descripcionEvento: "Vacuna anual contra la rabia"
        }
      ]
    },
    {
      idMascota: 2,
      nombre: 'Maxi',
      citas: [
        {
          id: 3,
          nombre: "Baño en casa",
          ubicacion: "Kr 45 F",
          tipoActividad: "Baño",
          fechaEvento: "2018-08-10",
          horaEvento: "12:00",
          descripcionEvento: "Baño semanal."
        },
        {
          id: 4,
          nombre: "Vacuna anual",
          ubicacion: "Calle 34 F 34",
          tipoActividad: "Vacuna",
          fechaEvento: "2019-05-01",
          horaEvento: "12:00",
          descripcionEvento: "Vacuna anual contra la rabia"
        }
      ]
    },
    {
      idMascota: 3,
      nombre: 'Remy',
      citas: [
        {
          id: 5,
          nombre: "Ir al veterinario",
          ubicacion: "Kr 45 F",
          tipoActividad: "Veterinario",
          fechaEvento: "2018-08-10",
          horaEvento: "12:00",
          descripcionEvento: "Control medico semestral."
        },
        {
          id: 6,
          nombre: "Cepillado de dientes",
          ubicacion: "Calle 34 F 34",
          tipoActividad: "Dientes",
          fechaEvento: "2019-05-01",
          horaEvento: "15:00",
          descripcionEvento: "Cepillado de dientes"
        }
      ]
    }
  ];

  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService) { }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }

  public highlightRow(emp) {
    console.log(emp.nombre);
    this.idEvento = emp.id;
    this.fechaEvento = emp.fechaEvento;
  }

  goToCreateEvent() {
    const modalRef = this.modalService.open(ModalCreateAgendaComponent);
    modalRef.componentInstance.agenda = this.agenda;
  }

  goToViewEvent(evento: Cita, mascotaSeleccionada) {
    const modalRef = this.modalService.open(ModalAgendaComponent);
    modalRef.componentInstance.eventoSeleccionado = evento;
    modalRef.componentInstance.mascotaSeleccionada = mascotaSeleccionada;
    modalRef.componentInstance.mascotas = this.agenda;
  }
}
