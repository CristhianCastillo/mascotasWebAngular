import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterAdminComponent } from './register-admin.component';

const routers: Routes = [
  {path:  "", component: RegisterAdminComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class RegisterAdminRoutingModule {}
