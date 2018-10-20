import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalCreatePetComponent } from './modal-create-pet/modal-create-pet.component';
//import { ModalOutMessageComponent } from '../modal-out-message/modal-out-message.component';
import { ModalPetComponent } from './modal-pet/modal-pet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PetsRoutingModule,
    NgbModule
  ],
  declarations: [
    PetsComponent,
    ModalCreatePetComponent,
    //ModalOutMessageComponent,
    ModalPetComponent
  ],
  entryComponents: [
    ModalCreatePetComponent,
    //ModalOutMessageComponent,
    ModalPetComponent
  ]
})
export class PetsModule { }
