import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { ScrollTopService } from '../services/scroll-top.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { RegistrationValidator } from '../validators/RegistrationValidator';
import { User } from '../models/User';
import { RegisterService } from '../services/registers/register.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalOutMessageComponent } from '../modal-out-message/modal-out-message.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _success = new Subject<string>();
  public staticAlertClosed = false;
  public dangerMessage: string;
  public registerForm: FormGroup;
  public passwordFormGroup: FormGroup;
  public usuario: User;

  constructor(private router: Router, private scrollTop: ScrollTopService, private formBuilder: FormBuilder,
              private service: RegisterService, private modalService: NgbModal) {
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
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.dangerMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  getData(){
    const user = {
      nombres: this.registerForm.value['nombres'],
      apellidos: this.registerForm.value['apellidos'],
      email: this.registerForm.value['email'],
      nombreUsuario: this.registerForm.value['nombreUsuario'], 
      password: this.passwordFormGroup.value['password']
    };
    this.registerUser(user);
  }

  registerUser(usuario) {
    console.log(usuario);
    this.service.createUser(usuario).subscribe(
      (result: any) => {
        console.log(result);
        if (result.status) {
          const modalRef = this.modalService.open(ModalOutMessageComponent);
          modalRef.componentInstance.tituloMensaje = 'Registro';
          modalRef.componentInstance.contenidoMensaje = 'Registro exitoso, por favor ingresa a la aplicación.';
          this.router.navigate(['/login']) ;
        } else {
          const message = result.message;
          if(message === 'UserName') {
            this._success.next('El nombre seleccionado estan en uso.');
          }
          else {
            this._success.next('El email seleccionado ya esta registrado.');
          }
        }
      }
    );
  }
}
