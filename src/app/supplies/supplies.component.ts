import {Component,  OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ModalCreateSupplieComponent } from './modal-create-supplie/modal-create-supplie.component';
import { ModalSupplieComponent } from './modal-supplie/modal-supplie.component';
import { ScrollTopService } from '../services/scroll-top.service';
import {Suministro} from '../models/Suministro';
import { SuppliesService } from '../services/supplies/supplies.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-supplies',
  templateUrl: './supplies.component.html',
  styleUrls: ['./supplies.component.css']
})
export class SuppliesComponent implements OnInit {
  public idSuministro: string ;
  public suministros: any;

  constructor(private modalService: NgbModal, private scrollTop: ScrollTopService, private service: SuppliesService,
               private spinner: NgxSpinnerService) { }

  public highlightRow(emp) {
    console.log(emp.id);
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
    const modalRef = this.modalService.open(ModalCreateSupplieComponent);
    modalRef.result.then(()=> {
      console.log('User Close');
    }, ()=>{
      console.log('Back Close');
      this.ngOnInit();
    })
  }

  goToViewSupplie(suministro: Suministro) {
    const modalRef = this.modalService.open(ModalSupplieComponent);
    modalRef.componentInstance.suministroSeleccionado = suministro;
    modalRef.result.then(()=> {
      console.log('User Close');
    }, ()=>{
      console.log('Back Close');
      this.ngOnInit();
    })
  }

}
