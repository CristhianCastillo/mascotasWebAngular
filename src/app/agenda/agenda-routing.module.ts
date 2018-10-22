import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda.component';

const routers: Routes = [
  {path:  "", component: AgendaComponent}
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class AgendaRoutingModule {}
