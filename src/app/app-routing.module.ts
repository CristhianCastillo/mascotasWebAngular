import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { NoLoginAdminGuard } from './guards/no-login-admin.guard';
import { LoginUserGuard } from './guards/login-user.guard';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'login',
    loadChildren: '../app/login/login.module#LoginModule',
    canActivate: [NoLoginAdminGuard]
  },
  {
    path: 'register',
    loadChildren: '../app/register/register.module#RegisterModule',
    canActivate: [NoLoginAdminGuard]
  },
  {
    path: 'registerAdmin',
    loadChildren: '../app/register-admin/register-admin.module#RegisterAdminModule',
    canActivate: [NoLoginAdminGuard]
  },
  {
    path: 'myPets',
    loadChildren: '../app/pets/pets.module#PetsModule',
    canActivate: [LoginUserGuard]
  },
  {
    path: 'agenda',
    loadChildren: '../app/agenda/agenda.module#AgendaModule',
    canActivate: [LoginUserGuard]
  },
  {
    path: 'supplies',
    loadChildren: '../app/supplies/supplies.module#SuppliesModule',
    canActivate: [LoginUserGuard]
  },
  {
    path: 'establishment',
    loadChildren: '../app/establishments/establishments.module#EstablishmentsModule',
    canActivate: [LoginAdminGuard]
  },
  {
    path: 'myPetsAdmin',
    loadChildren: '../app/pets-admin/pets-admin.module#PetsAdminModule',
    canActivate: [LoginAdminGuard]
  },
  {
    path: 'myPetsAdminPets',
    loadChildren: '../app/pets-admin-pets/pets-admin-pets.module#PetsAdminPetsModule',
    canActivate: [LoginAdminGuard]
  },
  {
    path: 'suppliesAdmin',
    loadChildren: '../app/supplies-admin/supplies-admin.module#SuppliesAdminModule',
    canActivate: [LoginAdminGuard]
  },
  {
    path: 'dashboardAdmin',
    loadChildren: '../app/dashboard-admin/dashboard-admin.module#DashboardAdminModule',
    canActivate: [LoginAdminGuard]
  },
  {path: 'error', component: ErrorComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
