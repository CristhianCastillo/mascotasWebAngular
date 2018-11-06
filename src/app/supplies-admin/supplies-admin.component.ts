import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ModalCreateSupplieAdminComponent} from './modal-create-supplie-admin/modal-create-supplie-admin.component';
import {ModalSupplieAdminComponent} from './modal-supplie-admin/modal-supplie-admin.component';
import { ScrollTopService } from '../services/scroll-top.service';
import { SuppliesService } from '../services/supplies/supplies.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-supplies-admin',
  templateUrl: './supplies-admin.component.html',
  styleUrls: ['./supplies-admin.component.css']
})
export class SuppliesAdminComponent implements OnInit {
  public idSuministro: string ;
  public suministros: any;

  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService, private service: SuppliesService,
              private spinner: NgxSpinnerService) { }

  public highlightRow(emp) {
    console.log(emp.nombre);
    this.idSuministro = emp.id;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    this.spinner.show();
    this.service.getAllSupplies(usuarioAutentificado.id).subscribe(
      (data) => {
        this.suministros = data;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error(error);
      }
    );
  }

  goToCreateSupplie() {
    const modalRef = this.modalService.open(ModalCreateSupplieAdminComponent);
    modalRef.result.then(()=> {
      console.log('User Close');
    }, ()=>{
      console.log('Back Close');
      this.ngOnInit();
    })
  }

  goToViewSupplie(suministro) {
    console.log(suministro);
    const modalRef = this.modalService.open(ModalSupplieAdminComponent);
    modalRef.componentInstance.suministroSeleccionado = suministro;
    modalRef.result.then(()=> {
      console.log('User Close');
    }, ()=>{
      console.log('Back Close');
      this.ngOnInit();
    })
  }

}
