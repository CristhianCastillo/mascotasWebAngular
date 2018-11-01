import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePetComponent } from './modal-create-pet/modal-create-pet.component';
import { ModalPetComponent } from './modal-pet/modal-pet.component';
import { PetService } from '../services/pets/pet.service';
import { ScrollTopService } from '../services/scroll-top.service';
import { Mascota } from '../models/Mascota';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  public  closeResult: string;
  public mascotasAny: any;
  public avisoCrearMascotas: string;

  constructor(private modalService: NgbModal, public petService: PetService, private scrollTop: ScrollTopService,
              private spinner: NgxSpinnerService, public _DomSanitizer: DomSanitizer) {
    this.avisoCrearMascotas = null;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    console.log('cargando mascotas...');
    this.spinner.show();
    this.petService.getAllPets(usuarioAutentificado.id).subscribe(
      (data) => {
        this.mascotasAny = data;
        if(data[0] === '[]'){
          console.log('No hayy....');
          this.avisoCrearMascotas = null;
        }
        else{
          console.log('Si hay...');
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
    console.log(mascota);
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
