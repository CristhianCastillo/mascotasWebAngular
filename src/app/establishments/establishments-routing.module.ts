import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstablishmentsComponent } from './establishments.component';

const routers: Routes = [
  {path:  "", component: EstablishmentsComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class EstablishmentsRoutingModule {}
