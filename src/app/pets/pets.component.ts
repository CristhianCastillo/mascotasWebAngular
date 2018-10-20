import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePetComponent } from './modal-create-pet/modal-create-pet.component';
import { ModalPetComponent } from './modal-pet/modal-pet.component';
import { PetService } from '../services/pets/pet.service';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {

  mascotas = [
    {
      id: 1,
      imagen: '../../assets/imgs/pet - 1.png',
      nombre: 'Pepe',
      tipoMascota: 'Raton',
      genero: 'Macho',
      fechaNacimiento: '2018-01-01',
      raza: 'Raton',
      esterilizado: 'Si',
      color: 'Cafe',
      descripcion: 'Es un animal muy tierno.'
    },
    {
      id: 2,
      imagen: '../../assets/imgs/pet - 2.png',
      nombre: 'Dock',
      tipoMascota: 'Perro',
      genero: 'Macho',
      fechaNacimiento: '2016-06-10',
      raza: 'Salchicha',
      esterilizado: 'Si',
      color: 'Cafe con blanco',
      descripcion: 'Es un animal muy leal.'
    },
    {
      id: 3,
      imagen: '../../assets/imgs/pet - 3.png',
      nombre: 'Muñeca',
      tipoMascota: 'Gato',
      genero: 'Hembra',
      fechaNacimiento: '2017-03-17',
      raza: 'Gata gris',
      esterilizado: 'Si',
      color: 'Gris',
      descripcion: 'Es una gatita muy curiosa'
    },
    {
      id: 4,
      imagen: '../../assets/imgs/pet - 4.png',
      nombre: 'Flu Flu',
      tipoMascota: 'Conejo',
      genero: 'Macho',
      fechaNacimiento: '2018-06-01',
      raza: 'Conejo Blanco',
      esterilizado: 'Si',
      color: 'Blanco',
      descripcion: 'Es un animal muy saltarin'
    },
    {
      id: 5,
      imagen: '../../assets/imgs/pet - 5.png',
      nombre: 'Sam',
      tipoMascota: 'Loro',
      genero: 'Macho',
      fechaNacimiento: '2012-10-30',
      raza: 'Loro Balcero',
      esterilizado: 'Si',
      color: 'Verde con Amarillo',
      descripcion: 'Es un animal muy calmado.'
    },
    {
      id: 6,
      imagen: '../../assets/imgs/pet - 6.png',
      nombre: 'Maxi',
      tipoMascota: 'Aguila',
      genero: 'Macho',
      fechaNacimiento: '2014-09-14',
      raza: 'Aguila Arpia',
      esterilizado: 'Si',
      color: 'Cafe y blanco',
      descripcion: 'Es un animal muy veloz.'
    }
  ];

  mascotasAny;

  constructor(private modalService: NgbModal, public petService: PetService, private scrollTop: ScrollTopService) {}

  ngOnInit() {
    this.scrollTop.setScrollTop();
    console.log('cargando mascotas...');
    this.petService.getAllPets().subscribe(
      (data) => {
        console.log(data);
        this.mascotasAny = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToCreatePet() {
    const modalRef = this.modalService.open(ModalCreatePetComponent);
  }

  goToViewPet(mascota) {
    console.log(mascota);
    const modalRef = this.modalService.open(ModalPetComponent)
    modalRef.componentInstance.mascota = mascota;
  }

  buttonPressedSaveItem() {
      console.log('refrescar al salir del mdodal');
    }
}
