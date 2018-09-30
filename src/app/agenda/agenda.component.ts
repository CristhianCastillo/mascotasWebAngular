import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateAgendaComponent } from './modal-create-agenda/modal-create-agenda.component';
import { ModalAgendaComponent } from './modal-agenda/modal-agenda.component';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  public nombreEvento: string ;
  public fechaEvento: string ;
  agenda = [
    {
      nombre: 'Muñeca',
      citas: [
        {
          nombreEvento: 'Corte de pelo',
          ubicacion: 'Kr 45 F',
          tipoActividad: 'Peluqueria',
          fecha: '2018-01-01',
          hora: '12:00',
          descripcionActividad: 'Corte de pelo semestral.'
        },
        {
          nombreEvento: 'Vacuna anual',
          ubicacion: 'Calle 34 F 34',
          tipoActividad: 'Vacuna B2',
          fecha: '2019-05-01',
          hora: '12:00',
          descripcionActividad: 'Vacuna anual contra la rabia'
        }
      ]
    },
    {
      nombre: 'Maxi',
      citas: [
        {
          nombreEvento: 'Baño en casa',
          ubicacion: 'Kr 45 F',
          tipoActividad: 'Baño',
          fecha: '2018-08-10',
          hora: '12:00',
          descripcionActividad: 'Baño semanal.'
        },
        {
          nombreEvento: 'Vacuna anual',
          ubicacion: 'Calle 34 F 34',
          tipoActividad: 'Vacuna B2',
          fecha: '2019-08-01',
          hora: '12:00',
          descripcionActividad: 'Vacuna anual contra la rabia'
        }
      ]
    },
    {
      nombre: 'Remy',
      citas: [
        {
          nombreEvento: 'Ir al veterinario',
          ubicacion: 'Kr 45 F',
          tipoActividad: 'Veterinaria',
          fecha: '2018-08-10',
          hora: '12:00',
          descripcionActividad: 'Control medico semestral.'
        },
        {
          nombreEvento: 'Cepillado de dientes',
          ubicacion: 'Calle 34 F 34',
          tipoActividad: 'Peluqueria',
          fecha: '2019-05-01',
          hora: '15:00',
          descripcionActividad: 'Cepillado de dientes'
        }
      ]
    }
  ];
  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService) { }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }

  public highlightRow(emp) {
    console.log(emp.nombreEvento);
    this.nombreEvento = emp.nombreEvento;
    this.fechaEvento = emp.fecha;
  }

  goToCreateEvent() {
    const modalRef = this.modalService.open(ModalCreateAgendaComponent);
    modalRef.componentInstance.agenda = this.agenda;
  }
  goToViewEvent(evento, mascotaSeleccionada) {
    const modalRef = this.modalService.open(ModalAgendaComponent);
    modalRef.componentInstance.eventoSeleccionado = evento;
    modalRef.componentInstance.mascotaSeleccionada = mascotaSeleccionada;
    modalRef.componentInstance.mascotas = this.agenda;
  }
}
