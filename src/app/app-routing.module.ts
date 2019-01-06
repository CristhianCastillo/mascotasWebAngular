import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { NoLoginAdminGuard } from './guards/no-login-admin.guard';
import { LoginUserGuard } from './guards/login-user.guard';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { NotfoundComponent } from './not-found/notfound.component';
import { LoginGuard } from './guards/login.guard';
import * as HeaderConst from '../app/constants/header-menu';
import { environment } from '@env/environment';

const routes: Routes = [
  {path: '', component: HomeComponent, data: {title: environment['application.name']}},
  {path: HeaderConst.ROUTING_URL_HOME, component: HomeComponent, data: {title: environment['application.name']}},
  {
    path: HeaderConst.ROUTING_URL_LOGIN,
    loadChildren: '../app/login/login.module#LoginModule',
    canActivate: [NoLoginAdminGuard], data: {title: environment.components.header['label.menu.login']}
  },
  {
    path: HeaderConst.ROUTING_URL_REGISTER,
    loadChildren: '../app/register/register.module#RegisterModule',
    canActivate: [NoLoginAdminGuard], data: {title: environment.components.header['label.menu.register']}
  },
  {
    path: HeaderConst.ROUTING_URL_MASCOTAS_USUARIO,
    loadChildren: '../app/pets/pets.module#PetsModule',
    canActivate: [LoginUserGuard], data: {title: environment.components.header['label.menu.mascotas.usuario']}
  },
  {
    path: HeaderConst.ROUTING_URL_AGENDA,
    loadChildren: '../app/agenda/agenda.module#AgendaModule',
    canActivate: [LoginUserGuard], data: {title: environment.components.header['label.menu.agenda.usuario']}
  },
  {
    path: HeaderConst.ROUTING_URL_SUPPLIES,
    loadChildren: '../app/supplies/supplies.module#SuppliesModule',
    canActivate: [LoginUserGuard], data: { title: environment.components.header['label.menu.suministros.usuario'] }
  },
  {
    path: HeaderConst.ROUTING_URL_ESTABLISHMENT,
    loadChildren: '../app/establishments/establishments.module#EstablishmentsModule',
    canActivate: [LoginAdminGuard], data: {title: environment.components.header['label.menu.establishment']}
  },
  {
    path: HeaderConst.ROUTING_URL_SOLICITUDES,
    loadChildren: '../app/pets-admin/pets-admin.module#PetsAdminModule',
    canActivate: [LoginAdminGuard], data: {title: environment.components.header['label.menu.solicitudes.propietario']}
  },
  {
    path: HeaderConst.ROUTING_URL_SUPPLIES_ADMIN,
    loadChildren: '../app/supplies/supplies.module#SuppliesModule',
    canActivate: [LoginGuard], data: {title: environment.components.header['label.menu.suministros.propietario']}
  },
  {
    path: HeaderConst.ROUTING_URL_ESTADISTICAS,
    loadChildren: '../app/dashboard-admin/dashboard-admin.module#DashboardAdminModule',
    canActivate: [LoginAdminGuard], data: {title: environment.components.header['label.menu.estadisticas']}
  },
  {path: HeaderConst.ROUTING_URL_ERROR, component: ErrorComponent, data: { title: environment.components.error['error.title.page'] }},
  {path: '**', component: NotfoundComponent, data: {title: environment.components.notfound['error.title.page']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
