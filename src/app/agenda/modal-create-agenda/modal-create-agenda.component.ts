import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../../modal-out-message/modal-out-message.component';
import { Validators, FormGroup, FormBuilder} from '@angular/forms';
import { AgendaService } from '../../services/agenda/agenda.service';

@Component({
  selector: 'app-modal-create-agenda',
  templateUrl: './modal-create-agenda.component.html',
  styleUrls: ['./modal-create-agenda.component.css']
})
export class ModalCreateAgendaComponent implements OnInit {

  @Input() listaMascotas: any[];
  public agendaForm: FormGroup;
  public services: any;
  constructor(private calendar: NgbCalendar, public activeModal: NgbActiveModal,  public config: NgbModalConfig
    , private modalService: NgbModal, private formBuilder: FormBuilder, private agendaService: AgendaService) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    this.agendaService.getServicesType().subscribe(
      (result: any ) => {
        this.services = result;
      },
      (error) => {
        console.error(error);
      }
    );
    this.agendaForm = this.createForm();
  }

  private createForm() {
    return this.formBuilder.group({
      idMascota: ['', Validators.required],
      nombre : ['', Validators.required],
      tipo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      ubicacion: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  getData(){
    const fechaJ = this.agendaForm.value['fecha'];
    const horaJ = this.agendaForm.value['hora'];
    let fechaDate: Date = new Date(Date.UTC(fechaJ.year, fechaJ.month - 1, fechaJ.day, horaJ.hour, horaJ.minute, 0, 0))
    console.log(fechaDate.toISOString().slice(0, 10));
    console.log(fechaDate.toISOString().slice(11, 16));
    const evento = {
      idMascota: this.agendaForm.value['idMascota'],
      nombre: this.agendaForm.value['nombre'],
      ubicacion: this.agendaForm.value['ubicacion'],
      idTipo: this.agendaForm.value['tipo'],
      fecha: fechaDate.toISOString().slice(0, 10) + ' ' + fechaDate.toISOString().slice(11, 16),
      descripcion: this.agendaForm.value['descripcion']
    }
    this.createEvent(evento);
  }

  createEvent(evento){
    console.log(evento);
    this.agendaService.createEvent(evento).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          this.showMessage("Registrar Evento", "Evento registrado correctamente!");
        } else {
          this.showMessage("Registrar Evento", "El evento no ha sido registrado!");
        }
      }
    );
  }

  showMessage(titulo, mensaje) {
    this.modalService.dismissAll();
    const modalRef = this.modalService.open(ModalOutMessageComponent);
    modalRef.componentInstance.tituloMensaje = titulo;
    modalRef.componentInstance.contenidoMensaje = mensaje;
  }

}
