import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SuppliesRoutingModule } from './supplies-routing.module';
import { SuppliesComponent } from './supplies.component';
import { ModalCreateSupplieComponent } from './modal-create-supplie/modal-create-supplie.component';
import { ModalSupplieComponent } from './modal-supplie/modal-supplie.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SuppliesRoutingModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    SuppliesComponent,
    ModalCreateSupplieComponent,
    ModalSupplieComponent
  ],
  entryComponents: [
    ModalCreateSupplieComponent,
    ModalSupplieComponent
  ]
})
export class SuppliesModule { }
