import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {NgbActiveModal, NgbModalConfig, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-out-message',
  templateUrl: './modal-out-message.component.html',
  styleUrls: ['./modal-out-message.component.css']
})
export class ModalOutMessageComponent implements OnInit {
  @Input() tituloMensaje = 'Mascotas.ga';
  @Input() contenidoMensaje = 'Mascotas.ga, el sito ideal para tus mascotas.';
  constructor(private router: Router, public activeModal: NgbActiveModal,  public config: NgbModalConfig) {
    config.backdrop = 'static';
  }

  ngOnInit() {
  }
}
