import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-pets-admin',
  templateUrl: './modal-pets-admin.component.html',
  styleUrls: ['./modal-pets-admin.component.css']
})
export class ModalPetsAdminComponent implements OnInit {

  @Input() servicios: any;

  constructor(public activeModal: NgbActiveModal,  public config: NgbModalConfig) {
    config.backdrop = 'static';
  }

  ngOnInit() {
    console.log(this.servicios);
  }

}
