import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EstablishmentsRoutingModule } from './establishments-routing.module';
import { EstablishmentsComponent } from './establishments.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EstablishmentsRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
    EstablishmentsComponent
  ],
  entryComponents: [
  ]
})
export class EstablishmentsModule { }
