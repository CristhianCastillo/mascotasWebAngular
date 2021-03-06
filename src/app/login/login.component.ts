import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@services/login/login.service';
import { ScrollTopService } from '@services/scroll-top/scroll-top.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime}  from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
import * as UserConst from '@constants/login';
import * as HeaderConst from '@constants/header-menu';
import { environment } from '@env/environment';
import {ValidationsUtils} from '@utils/validations-utils';
import * as CommonConst from '@constants/common';
import { MessagesUtils } from '@utils/messages-utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private succes = new Subject<string>();
  public staticAlertClosed = false;
  public dangerMessage: string;
  public loginForm: FormGroup;
  public text: string;
  public propiedades: any;
  public variables: any;
  public urls: any;
  constructor(private router: Router, public serviceLogin: LoginService, private formBuilder: FormBuilder,
              private scrollTop: ScrollTopService, private spinner: NgxSpinnerService, private messageService: MessagesUtils) {
    this.loginForm = this.createForm();
    this.propiedades = environment.components.login;
    this.variables = environment;
    this.urls = HeaderConst;
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this.succes.subscribe((message) => this.dangerMessage = message);
    this.succes.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  handleReset() {}

  handleExpire() {}

  handleLoad() {}

  handleSuccess(event){}

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.loginForm);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.loginForm);
  }

  isCheckCaptcha(field: string){
    return ValidationsUtils.isCheckCaptcha(field, this.loginForm);
  }

  private createForm() {
    return this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      recaptcha: ['', Validators.required],
      recordarPassword : false
    });
  }

  validData() {
    if(this.loginForm.valid) {
      const usuarioLogin = {
        usuario: this.loginForm.value['usuario'],
        password: this.loginForm.value['password']
      };
      this.loginUser(usuarioLogin);
    } else {
      ValidationsUtils.validateAllFormFields(this.loginForm);
    }
  }

  loginUser(data) {
    this.spinner.show();
    this.serviceLogin.loginUser(data).subscribe(
      (result: any) => {
        this.spinner.hide();
        if (result.code === CommonConst.SUCCESS_CODE) {
          let resultFilter = result.result;
          const usuarioEnter = {
            id: resultFilter.user,
            usuario: data.usuario,
            password: data.password,
            tipoUsuario: resultFilter.root,
            token: resultFilter.token
          }
          localStorage.setItem(UserConst.USER_SESSION, JSON.stringify( usuarioEnter )) ;
          if(resultFilter.root === UserConst.USER_PET_OWNER){
            this.router.navigate([HeaderConst.URL_MASCOTAS_USUARIO]).then(()=>{});
          }
          else if(resultFilter.root === UserConst.USER_ESTABLISHMENT_OWNER){
            this.router.navigate([HeaderConst.URL_ESTABLISHMENT]).then(()=>{});
          }
        } else {
          this.succes.next(result.description);
        }
      }, (error) => {
        this.spinner.hide();
        console.error(error);
        this.messageService.showMessageError();
      }
    );
  }
}
