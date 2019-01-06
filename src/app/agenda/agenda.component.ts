import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateAgendaComponent } from './modal-create-agenda/modal-create-agenda.component';
import { ModalAgendaComponent } from './modal-agenda/modal-agenda.component';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import { AgendaService } from '../services/agenda/agenda.service';
import { Cita } from '../models/Cita';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '@env/environment';
import * as LoginConst from '../constants/login';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  public idEvento: number;
  public fechaEvento: string;
  public agenda: any;
  public propiedades: any;
  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService, private agendaService: AgendaService,
              private spinner: NgxSpinnerService) {
      this.propiedades = environment.components.agenda;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    this.spinner.show();
    this.agendaService.getAllAgenda(usuarioAutentificado.id).subscribe(
      (data) => {
        this.agenda = data;
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        console.error(error);
      }
    );
  }

  trackByFn(index, item) {
    return item.id;
  }

  changeStyleRow(emp) {
    this.idEvento = emp.id;
    this.fechaEvento = emp.fecha;
  }

  goToCreateEvent() {
    const modalRef = this.modalService.open(ModalCreateAgendaComponent);
    modalRef.componentInstance.listaMascotas = this.agenda;
    modalRef.result.then(() => {},
      () => {
      this.ngOnInit();
    });
  }

  goToViewEvent(evento: Cita, mascotaSeleccionada) {
    const modalRef = this.modalService.open(ModalAgendaComponent);
    modalRef.componentInstance.eventoSeleccionado = evento;
    modalRef.componentInstance.mascotaSeleccionada = mascotaSeleccionada;
    modalRef.componentInstance.listaMascotas = this.agenda;
    modalRef.result.then(() => {
    }, () => {
      this.ngOnInit();
    });
  }
}
