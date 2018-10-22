import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ScrollTopService } from '../services/scroll-top.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegistrationValidator } from '../validators/RegistrationValidator';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  public registerForm: FormGroup;
  public passwordFormGroup: FormGroup;

  constructor(private activateRoute: ActivatedRoute, private router: Router,
              private scrollTop: ScrollTopService, private formBuilder: FormBuilder) {
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
      establecimiento: ['', Validators.required],
      nit: ['', Validators.required],
      descripcion: ['', Validators.required],
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
      establecimiento: this.registerForm.value['establecimiento'],
      nit: this.registerForm.value['nit'],
      descripcion: this.registerForm.value['descripcion'],
      password: this.passwordFormGroup.value['password']
    }
    this.registerOwner(user);
  }

  registerOwner(usuario){
    console.log(usuario);
    const persona = {
      usuario: 'Cristhian',
      password: 'cristhian',
      tipoUsuario: 'Propietario'
    } ;
    localStorage.setItem('user', JSON.stringify( persona )) ;
    this.router.navigate(['/establishment']) ;
  }
}
