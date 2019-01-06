import { Component,  OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateSupplieComponent } from './modal-create-supplie/modal-create-supplie.component';
import { ModalSupplieComponent } from './modal-supplie/modal-supplie.component';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import {Suministro} from '../models/Suministro';
import { SuppliesService } from '../services/supplies/supplies.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as LoginConst from '../constants/login';
import { environment } from '@env/environment';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {
  public idSuministro: string ;
  public suministros: any;
  public propiedades: any;
  public variables: any;
  public title: string;

  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService, private service: SuppliesService,
               private spinner: NgxSpinnerService) {
    this.propiedades = environment.components.supplies;
    this.variables = environment;
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    if (usuarioAutentificado.tipoUsuario === LoginConst.USER_PET_OWNER) {
      this.title = this.propiedades['title'];
    } else {
      this.title = this.propiedades['title.admin'];
    }
  }

  changeStyleRow(emp) {
    this.idSuministro = emp.id;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
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

  trackByFn(index, item) {
    return item.id;
  }

  goToCreateSupplie() {
    const modalRef = this.modalService.open(ModalCreateSupplieComponent);
    modalRef.result.then(()=> {
    }, ()=>{
      this.ngOnInit();
    })
  }

  goToViewSupplie(suministro: Suministro) {
    const modalRef = this.modalService.open(ModalSupplieComponent);
    modalRef.componentInstance.suministroSeleccionado = suministro;
    modalRef.result.then(()=> {
    }, ()=>{
      this.ngOnInit();
    })
  }
}
