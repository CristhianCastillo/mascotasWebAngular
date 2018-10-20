import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PetsAdminComponent } from './pets-admin.component';
import { PetsAdminOwnerComponent} from './pets-admin-owner/pets-admin-owner.component';

const routers: Routes = [
    {path:  '', component: PetsAdminComponent},
    {path: ':id', component: PetsAdminOwnerComponent}
  /**
    {path: '', children: [
        {path: '', component: PetsAdminComponent},
        //{path: ':id', component: PetsAdminOwnerComponent}
        {path: ':folder', children: [
            {path: ':id', component: PetsAdminOwnerComponent}
          ] }
      ]}
   **/
];

@NgModule({
  exports: [ RouterModule ],
  imports: [RouterModule.forChild(routers)]
})
export class PetsAdminRoutingModule {}
