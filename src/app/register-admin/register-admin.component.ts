import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(public servicio: UserService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  loginUser() {
    const persona = {
      usuario: 'Cristhian',
      password: 'cristhian',
      tipoUsuario: 'Propietario'
    } ;
    localStorage.setItem('user', JSON.stringify( persona )) ;
    this.router.navigate(['/establishment']) ;
  }
}
