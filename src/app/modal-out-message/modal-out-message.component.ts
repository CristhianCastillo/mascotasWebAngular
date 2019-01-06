import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';

@Component({
  selector: 'app-modal-out-message',
  templateUrl: './modal-out-message.component.html',
  styleUrls: ['./modal-out-message.component.css']
})
export class ModalOutMessageComponent implements OnInit {
  @Input() tituloMensaje = environment.common.messages['message.title.default'];
  @Input() contenidoMensaje = environment.common.messages['message.body.default'];

  public variables: any;
  constructor(public activeModal: NgbActiveModal,  public config: NgbModalConfig) {
    config.backdrop = 'static';
    this.variables = environment;
  }

  ngOnInit() {
  }
}
