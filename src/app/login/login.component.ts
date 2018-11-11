import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from '../services/login/login.service';
import { ScrollTopService } from '../services/scroll-top.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _success = new Subject<string>();
  public staticAlertClosed = false;
  public dangerMessage: string;
  public loginForm: FormGroup;
  constructor(private router: Router, public serviceLogin: LoginService, private formBuilder: FormBuilder,
              private scrollTop: ScrollTopService, private spinner: NgxSpinnerService) {
    this.loginForm = this.createForm();
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.dangerMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  private createForm() {
    return this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
      recordarPassword : false
    });
  }

  validData() {
    const usuarioLogin = {
      usuario: this.loginForm.value['usuario'],
      password: this.loginForm.value['password']
    };
    this.loginUser(usuarioLogin);
  }

  loginUser(data) {
    this.spinner.show();
    this.serviceLogin.loginUser(data).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          const usuarioEnter = {
            id: result.message,
            usuario: data.usuario,
            password: data.password,
            tipoUsuario: result.root,
            token: result.token
          }
          localStorage.setItem('user', JSON.stringify( usuarioEnter )) ;
          if(result.root === 'Usuario'){
            this.router.navigate(['/myPets']) ;
          }
          else if(result.root === 'Propietario'){
            this.router.navigate(['/establishment']) ;
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
          this._success.next('Usuario y/o contraseña no validos.');
        }
      }
    );
  }
}
