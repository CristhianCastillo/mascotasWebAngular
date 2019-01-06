import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePetComponent } from './modal-create-pet/modal-create-pet.component';
import { ModalPetComponent } from './modal-pet/modal-pet.component';
import { PetService } from '../services/pets/pet.service';
import { ScrollTopService } from '../services/scroll-top/scroll-top.service';
import { Mascota } from '../models/Mascota';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import * as LoginConst from '../constants/login';
import { environment } from '@env/environment';
import * as CommonConst from '../constants/common';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  public mascotasAny: any;
  public avisoCrearMascotas: string;
  public propiedades: any;
  public variables: any;
  public convertImage: string;

  constructor(private modalService: NgbModal, public petService: PetService, private scrollTop: ScrollTopService,
              private spinner: NgxSpinnerService, public _DomSanitizer: DomSanitizer) {
    this.avisoCrearMascotas = null;
    this.propiedades = environment.components.pets;
    this.variables = environment;
    this.convertImage = CommonConst.IMAGEN_CONVERT_BASE_64;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    this.spinner.show();
    this.petService.getAllPets(usuarioAutentificado.id).subscribe(
      (data) => {
        this.mascotasAny = data;
        if(data[0] === '[]'){
          this.avisoCrearMascotas = null;
        }
        else{
          this.avisoCrearMascotas = '';
        }
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

  goToCreatePet() {
    const modal = this.modalService.open(ModalCreatePetComponent);
    modal.result.then(()=> {
      console.log('User Close');
    }, ()=>{
      console.log('Back Close');
      this.ngOnInit();
    })
  }

  goToViewPet(mascota: Mascota) {
    const modalRef = this.modalService.open(ModalPetComponent);
    modalRef.componentInstance.mascota = mascota;
    modalRef.result.then(()=>{
      console.log('User Close');
    }, ()=>{
      console.log('Back Close');
      this.ngOnInit();
    })
  }
}
