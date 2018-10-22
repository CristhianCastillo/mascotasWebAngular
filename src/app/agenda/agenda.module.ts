import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { ModalAgendaComponent } from './modal-agenda/modal-agenda.component';
import { ModalCreateAgendaComponent } from './modal-create-agenda/modal-create-agenda.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgendaRoutingModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    AgendaComponent,
    ModalAgendaComponent,
    ModalCreateAgendaComponent
  ],
  entryComponents: [
    ModalAgendaComponent,
    ModalCreateAgendaComponent
  ]
})
export class AgendaModule { }
