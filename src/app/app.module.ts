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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Services
 */
import { LoginService } from './services/login/login.service';
import { PetService } from './services/pets/pet.service';
import { GlobalErrorHandler } from './services/error-global/global-error-handler.service';
import { ScrollTopService } from './services/scroll-top/scroll-top.service';
import { AuthInterceptor } from './services/http-interceptor/AuthInterceptor';
import { LoginGuard } from './guards/login.guard';
import { MessagesUtils } from './utils/messages-utils';
import { NotfoundComponent } from './not-found/notfound.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    FooterComponent,
    ModalOutMessageComponent,
    HomeComponent,
    ErrorComponent,
    NotfoundComponent
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
    NgbActiveModal,
    MessagesUtils,
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    LoginAdminGuard, NoLoginAdminGuard, LoginUserGuard, LoginGuard, LoginService, PetService, ScrollTopService],
  bootstrap: [AppComponent],
  entryComponents: [
    ModalOutMessageComponent
  ]
})
export class AppModule { }
