import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsAdminRoutingModule } from './pets-admin-routing.module';
import { PetsAdminComponent } from './pets-admin.component'; 
import { PetsAdminOwnerComponent} from './pets-admin-owner/pets-admin-owner.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PetsAdminRoutingModule,
    NgbModule,
  ],
  declarations: [PetsAdminComponent, PetsAdminOwnerComponent],
})
export class PetsAdminModule { }
