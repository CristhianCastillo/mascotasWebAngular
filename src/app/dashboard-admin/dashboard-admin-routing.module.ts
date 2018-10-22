import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin.component';

const routers: Routes = [
  {path:  "", component: DashboardAdminComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class DashboardAdminRoutingModule {}
