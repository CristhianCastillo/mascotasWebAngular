import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FooterComponent } from './footer/footer.component';
import { ModalOutMessageComponent } from './modal-out-message/modal-out-message.component';
import { ErrorComponent } from './error/error.component';
import { LoginAdminGuard } from './guards/login-admin.guard';
import { NoLoginAdminGuard } from './guards/no-login-admin.guard';
import { LoginUserGuard } from './guards/login-user.guard';
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
    FooterComponent,
    ModalOutMessageComponent,
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
  providers: [
    //{ provide: ErrorHandler, useClass: GlobalErrorHandler },
    LoginAdminGuard, NoLoginAdminGuard, LoginUserGuard, LoginService, PetService, ScrollTopService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalOutMessageComponent,
    ModalPetsAdminComponent
  ]
})
export class AppModule { }
