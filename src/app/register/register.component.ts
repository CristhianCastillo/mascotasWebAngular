import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ScrollTopService } from '../services/scroll-top.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegistrationValidator } from '../validators/RegistrationValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public passwordFormGroup: FormGroup;

  constructor(private router: Router, private scrollTop: ScrollTopService, private formBuilder: FormBuilder) {
    this.passwordFormGroup = this.formBuilder.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {validator: RegistrationValidator.validatePasswords('password', 'confirmPassword')})
    this.registerForm = this.formBuilder.group({
      nombreUsuario : ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', Validators.compose([Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      passwordFormGroup : this.passwordFormGroup,
      terminosCondiciones: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
  }

  getData(){
    const user = {
      nombreUsuario: this.registerForm.value['nombreUsuario'],
      nombres: this.registerForm.value['nombres'],
      apellidos: this.registerForm.value['apellidos'],
      emailUsuario: this.registerForm.value['email'],
      password: this.passwordFormGroup.value['password']
    }
    this.registerUser(user);
  }

  registerUser(usuario){
    console.log(usuario);
    const persona = {
      usuario: 'Cristhian',
      password: 'cristhian',
      tipoUsuario: 'Usuario'
    } ;
    localStorage.setItem('user', JSON.stringify( persona )) ;
    this.router.navigate(['/myPets']) ;
  }
}
