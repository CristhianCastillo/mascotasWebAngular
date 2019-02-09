import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateAgendaComponent } from './modal-create-agenda/modal-create-agenda.component';
import { ModalAgendaComponent } from './modal-agenda/modal-agenda.component';
import { ScrollTopService } from '@services/scroll-top/scroll-top.service';
import { AgendaService } from '@services/agenda/agenda.service';
import { Cita } from '@models/Cita';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from '@env/environment';
import * as LoginConst from '@constants/login';
import * as CommonConst from '@constants/common';
import { MessagesUtils } from '@utils/messages-utils';

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
  public avisoAgendaCrear: string;
  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService, private agendaService: AgendaService,
              private spinner: NgxSpinnerService, private messageServices: MessagesUtils) {
      this.propiedades = environment.components.agenda;
      this.avisoAgendaCrear = null;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    this.spinner.show();
    this.agendaService.getAllAgenda(usuarioAutentificado.id).subscribe(
      (result: any) => {
        if(result.code === CommonConst.SUCCESS_CODE) {
          this.agenda = result.result;
          this.avisoAgendaCrear = null;
          for(let i = 0; i < result.result.length; i ++) {
            let temp: any = result.result[i];
            if(temp.citas.length > 0) {
              this.avisoAgendaCrear = '';
              break;
            }
          }
        } else {
          this.messageServices.showMessageError(null, result.description);
        }
        this.spinner.hide();
      }, (error) => {
        this.spinner.hide();
        console.error(error);
        this.messageServices.showMessageError();
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
