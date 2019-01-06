import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuppliesComponent } from './supplies.component';

const routers: Routes = [
  {path:  "", component: SuppliesComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class SuppliesRoutingModule {}
