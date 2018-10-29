import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePetComponent } from './modal-create-pet/modal-create-pet.component';
import { ModalPetComponent } from './modal-pet/modal-pet.component';
import { PetService } from '../services/pets/pet.service';
import { ScrollTopService } from '../services/scroll-top.service';
import {Mascota} from '../models/Mascota';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  
  public mascotasAny: any;
  public imageSrc: any;
  public image: any;

  constructor(private modalService: NgbModal, public petService: PetService, private scrollTop: ScrollTopService,
              private spinner: NgxSpinnerService, public _DomSanitizer: DomSanitizer) {
                this.image = '';
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    console.log('cargando mascotas...');
    this.spinner.show();

    // this.petService.getImagen('5bd4f01c5cbc390ccc5dbf2b').subscribe(
    //     //   (data) => {
    //     //     this.imageSrc = data;
    //     //     this.imageSrc = this.imageSrc.imagen
    //     //     console.log(this.imageSrc);
    //     //     this.image = this._DomSanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.imageSrc);
    //     //   },
    //     //   (error) => {
    //     //     console.error(error);
    //     //   }
    //     // );

    this.petService.getAllPets().subscribe(
      (data) => {
        console.log(data);
        this.mascotasAny = data;
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        console.error(error);
      }
    );
  }

  goToCreatePet() {
    const modalRef = this.modalService.open(ModalCreatePetComponent);
  }

  goToViewPet(mascota: Mascota) {
    console.log(mascota);
    const modalRef = this.modalService.open(ModalPetComponent)
    modalRef.componentInstance.mascota = mascota;
  }
}
