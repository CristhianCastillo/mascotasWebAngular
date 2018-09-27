import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { PetsComponent } from './pets/pets.component';
import { AgendaComponent } from './agenda/agenda.component';
import { SuppliesComponent } from './supplies/supplies.component';


import { EstablishmentsComponent } from './establishments/establishments.component';
import { SuppliesAdminComponent } from './supplies-admin/supplies-admin.component';


import { LoginAdminGuard } from './guards/login-admin.guard';
import { NoLoginAdminGuard } from './guards/no-login-admin.guard';
import { LoginUserGuard } from './guards/login-user.guard';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent, canActivate: [NoLoginAdminGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [NoLoginAdminGuard]},
  {path: 'registerAdmin', component: RegisterAdminComponent, canActivate: [NoLoginAdminGuard]},
  {path: 'myPets', component: PetsComponent, canActivate: [LoginUserGuard]},
  {path: 'agenda', component: AgendaComponent, canActivate: [LoginUserGuard]},
  {path: 'supplies', component: SuppliesComponent, canActivate: [LoginUserGuard]},
  {path: 'establishment', component: EstablishmentsComponent, canActivate: [LoginAdminGuard]},
  {path: 'suppliesAdmin', component: SuppliesAdminComponent, canActivate: [LoginAdminGuard]},
  {path: 'dashboardAdmin', component: DashboardAdminComponent, canActivate: [LoginAdminGuard]},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
