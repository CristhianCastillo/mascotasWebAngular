import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsComponent } from './pets.component';

const routers: Routes = [
    {path:  "", component: PetsComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class PetsRoutingModule {}