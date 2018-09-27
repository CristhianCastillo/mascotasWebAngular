import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { LoginService } from '../services/login/login.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  dangerMessage: string;
  loginForm: FormGroup;
  constructor(private router: Router, public serviceLogin: LoginService, private formBuilder: FormBuilder) {
    this.loginForm = this.createForm();
  }

  ngOnInit() {
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
      password: this.loginForm.value['password'],
      tipoUsuario: 'Usuario'
    };
    this.loginUser(usuarioLogin);
  }

  loginUser(data) {
    this.serviceLogin.loginUser(data).subscribe(
      (result: boolean) => {
        console.log(result);
        if (result) {
          localStorage.setItem('user', JSON.stringify( data )) ;
          this.router.navigate(['/myPets']) ;
        } else {
          this._success.next('Usuario y/o contraseña no validos.');
        }
      }
    );
  }

}
