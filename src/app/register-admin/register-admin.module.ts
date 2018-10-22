import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterAdminRoutingModule } from './register-admin-routing.module';
import { RegisterAdminComponent } from './register-admin.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterAdminRoutingModule,
    NgbModule,
    NgxSpinnerModule
  ],
  declarations: [
    RegisterAdminComponent
  ],
  entryComponents: [
  ]
})
export class RegisterAdminModule{ }
