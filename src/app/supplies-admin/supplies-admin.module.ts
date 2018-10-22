import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuppliesAdminRoutingModule } from './supplies-admin-routing.module';
import { SuppliesAdminComponent } from './supplies-admin.component';
import { ModalCreateSupplieAdminComponent } from './modal-create-supplie-admin/modal-create-supplie-admin.component';
import { ModalSupplieAdminComponent } from './modal-supplie-admin/modal-supplie-admin.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuppliesAdminRoutingModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    SuppliesAdminComponent,
    ModalCreateSupplieAdminComponent,
    ModalSupplieAdminComponent
  ],
  entryComponents: [
    ModalCreateSupplieAdminComponent,
    ModalSupplieAdminComponent
  ]
})
export class SuppliesAdminModule { }
