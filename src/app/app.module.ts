import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
//import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
//import { PetsComponent } from './pets/pets.component';
//import { ModalCreatePetComponent } from './pets/modal-create-pet/modal-create-pet.component';
import { ModalOutMessageComponent } from './modal-out-message/modal-out-message.component';
//import { ModalPetComponent } from './pets/modal-pet/modal-pet.component';
import { AgendaComponent } from './agenda/agenda.component';
import { ModalCreateAgendaComponent } from './agenda/modal-create-agenda/modal-create-agenda.component';
import { ModalAgendaComponent } from './agenda/modal-agenda/modal-agenda.component';
import { SuppliesComponent } from './supplies/supplies.component';
import { ModalCreateSupplieComponent } from './supplies/modal-create-supplie/modal-create-supplie.component';
import { ModalSupplieComponent } from './supplies/modal-supplie/modal-supplie.component';
import { EstablishmentsComponent } from './establishments/establishments.component';
import { ErrorComponent } from './error/error.component';

import { LoginAdminGuard } from './guards/login-admin.guard';
import { NoLoginAdminGuard } from './guards/no-login-admin.guard';
import { LoginUserGuard } from './guards/login-user.guard';
import { SuppliesAdminComponent } from './supplies-admin/supplies-admin.component';
import { ModalCreateSupplieAdminComponent } from './supplies-admin/modal-create-supplie-admin/modal-create-supplie-admin.component';
import { ModalSupplieAdminComponent } from './supplies-admin/modal-supplie-admin/modal-supplie-admin.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';

/**
 * Services
 */
import { LoginService } from './services/login/login.service';
import { PetService } from './services/pets/pet.service';
import { GlobalErrorHandler } from './global-error-handler.service';
import { ScrollTopService } from './services/scroll-top.service';
import { ModalPetsAdminComponent } from './modal-pets-admin/modal-pets-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    //LoginComponent,
    RegisterComponent,
    FooterComponent,
    RegisterAdminComponent,
    //PetsComponent,
    //ModalCreatePetComponent,
    ModalOutMessageComponent,
    //ModalPetComponent,
    AgendaComponent,
    ModalCreateAgendaComponent,
    ModalAgendaComponent,
    SuppliesComponent,
    ModalCreateSupplieComponent,
    ModalSupplieComponent,
    EstablishmentsComponent,
    SuppliesAdminComponent,
    ModalCreateSupplieAdminComponent,
    ModalSupplieAdminComponent,
    DashboardAdminComponent,
    HomeComponent,
    ErrorComponent,
    ModalPetsAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [{ provide: ErrorHandler, useClass: GlobalErrorHandler },
    LoginAdminGuard, NoLoginAdminGuard, LoginUserGuard, LoginService, PetService, ScrollTopService],
  bootstrap: [AppComponent],
  entryComponents: [
    //ModalCreatePetComponent,
    ModalOutMessageComponent,
    //ModalPetComponent,
    ModalCreateAgendaComponent,
    ModalAgendaComponent,
    ModalCreateSupplieComponent,
    ModalSupplieComponent,
    ModalCreateSupplieAdminComponent,
    ModalSupplieAdminComponent,
    ModalPetsAdminComponent
  ]
})
export class AppModule { }
