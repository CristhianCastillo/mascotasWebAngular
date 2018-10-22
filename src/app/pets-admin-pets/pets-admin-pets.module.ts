import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsAdminPetsRoutingModule } from './pets-admin-pets-routing.module';
import { PetsAdminPetsComponent } from './pets-admin-pets.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PetsAdminPetsRoutingModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [PetsAdminPetsComponent],
})
export class PetsAdminPetsModule { }
