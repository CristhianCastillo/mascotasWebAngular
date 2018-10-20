import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsAdminPetsComponent } from './pets-admin-pets.component';

const routers: Routes = [
  {path:  '', component: PetsAdminPetsComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class PetsAdminPetsRoutingModule {}
