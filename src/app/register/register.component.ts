import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollTopService } from '@services/scroll-top/scroll-top.service';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { User } from '@models/User';
import { RegisterService } from '@services/registers/register.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '@env/environment';
import * as HeaderConst from '@constants/header-menu';
import * as RegisterConst from '@constants/register';
import * as CommonConst from '@constants/common';
import { ValidationsUtils } from '@utils/validations-utils';
import { MessagesUtils } from '@utils/messages-utils';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private success = new Subject<string>();
  public staticAlertClosed = false;
  public dangerMessage: string;
  public registerForm: FormGroup;
  public usuario: User;

  public propiedades: any;
  public propiedadesRegister: any;
  public variables: any;
  public urlRegister: string;
  public urls: any;
  public typeRegister: any;

  constructor(private router: Router, private scrollTop: ScrollTopService, private formBuilder: FormBuilder,
              private service: RegisterService, private modalService: NgbModal, private route: ActivatedRoute,
              private messageService: MessagesUtils) {

    this.propiedades = environment.components.register;
    this.variables = environment;
    this.urls = HeaderConst;

    this.route.params.subscribe(params => {

      this.registerForm = this.formBuilder.group({
        nombreUsuario : ['', [Validators.required, Validators.minLength(6)]],
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        email: ['', Validators.compose([Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
        passwordFormGroup : this.formBuilder.group({
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        }, {validator: ValidationsUtils.validatePasswords('password', 'confirmPassword')}),
        terminosCondiciones: [false, Validators.requiredTrue],
        recaptcha: ['', Validators.required]
      });

      this.typeRegister = params['id'];
      if(this.typeRegister == HeaderConst.URL_REGISTER_ADMIN.split('/')[2]) {
        this.propiedadesRegister = environment.components.register['register.owner'];
        this.urlRegister = HeaderConst.URL_REGISTER;
        this.registerForm.addControl('establecimiento', new FormControl('',Validators.required));
        this.registerForm.addControl('nit', new FormControl('',Validators.required));
        this.registerForm.addControl('descripcion', new FormControl('',Validators.required));
      } else if(this.typeRegister === HeaderConst.URL_REGISTER.split('/')[2]){
        this.propiedadesRegister = environment.components.register['register.user'];
        this.urlRegister = HeaderConst.URL_REGISTER_ADMIN;
      } else {
        this.router.navigate([HeaderConst.URL_ERROR]).then( () => {});
      }
    });
  }

  ngOnInit() {
    this.scrollTop.setScrollTop();
    setTimeout(() => this.staticAlertClosed = true, 20000);
    this.success.subscribe((message) => this.dangerMessage = message);
    this.success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.dangerMessage = null);
  }

  isValidCheck(field: string){
    return ValidationsUtils.isValidCheck(field, this.registerForm);
  }

  isValidInput(field: string){
    return ValidationsUtils.isValidInput(field, this.registerForm);
  }

  isCheckValid(field: string) {
   return ValidationsUtils.isCheckValid(field, this.registerForm);
  }

  isCheckCaptcha(field: string){
    return ValidationsUtils.isCheckCaptcha(field, this.registerForm);
  }

  handleReset() {}

  handleExpire() {}

  handleLoad() {}

  handleSuccess(event){}

  getData() {
    if(this.typeRegister === HeaderConst.URL_REGISTER_ADMIN.split('/')[2]){
      if(this.registerForm.valid) {
        const user = {
          nombre: this.registerForm.value['nombres'],
          apellidos: this.registerForm.value['apellidos'],
          email: this.registerForm.value['email'],
          username: this.registerForm.value['nombreUsuario'],
          password: this.registerForm.get('passwordFormGroup').value['password'],
          establecimiento: this.registerForm.value['establecimiento'],
          nit: this.registerForm.value['nit'],
          descripcion: this.registerForm.value['descripcion']
        };
        this.registerUser(user, true);
      } else {
        ValidationsUtils.validateAllFormFields(this.registerForm);
      }
    } else {
      if(this.registerForm.valid) {
        const user = {
          nombre: this.registerForm.value['nombres'],
          apellidos: this.registerForm.value['apellidos'],
          email: this.registerForm.value['email'],
          username: this.registerForm.value['nombreUsuario'],
          password: this.registerForm.get('passwordFormGroup').value['password']
        };
        this.registerUser(user, false);
      } else {
        ValidationsUtils.validateAllFormFields(this.registerForm);
      }
    }
  }

  registerUser(usuario: any, owner: boolean) {
    this.service.createUser(usuario, owner).subscribe(
      (result: any) => {
        if (result.code === CommonConst.SUCCESS_CODE) {
          this.messageService.showMessageSucces(this.propiedades['register.message.title'], this.propiedades['register.message.correct']);
          this.router.navigate([HeaderConst.URL_LOGIN]).then(()=>{});
        } else {
          const message = result.description;
          let messageAlert = "";
          switch (message) {
            case RegisterConst.INVALID_USER_NAME :
              messageAlert = this.propiedades['alert.message.user.invalid'];
              break;
            case RegisterConst.INVALID_USER_EMAIL :
              messageAlert = this.propiedades['alert.message.email.invalid'];
              break;
            case RegisterConst.INVALID_USER_ESTABLISHMENT :
              messageAlert = this.propiedades['alert.message.establecimiento.invalid'];
              break;
            case RegisterConst.INVALID_USER_NIT :
              messageAlert = this.propiedades['alert.message.nit.invalid'];
              break;
            default :
              messageAlert = message;
              break;
          }
          //this.success.next(messageAlert);
          this.messageService.showMessageError(null, messageAlert);
        }
      }, (error) => {
        console.log(error);
        this.messageService.showMessageError();
      }
    );
  }
}
