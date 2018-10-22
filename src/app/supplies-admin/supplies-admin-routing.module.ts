import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliesAdminComponent } from './supplies-admin.component';

const routers: Routes = [
  {path:  "", component: SuppliesAdminComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class SuppliesAdminRoutingModule {}
