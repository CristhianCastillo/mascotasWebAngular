import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardAdminRoutingModule } from './dashboard-admin-routing.module';
import { DashboardAdminComponent } from './dashboard-admin.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardAdminRoutingModule,
    NgbModule
  ],
  declarations: [
    DashboardAdminComponent
  ],
  entryComponents: [
  ]
})
export class DashboardAdminModule { }
