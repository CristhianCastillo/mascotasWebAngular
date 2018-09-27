import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    const persona = {
      usuario: 'Cristhian',
      password: 'cristhian',
      tipoUsuario: 'Usuario'
    } ;
    localStorage.setItem('user', JSON.stringify( persona )) ;
    this.router.navigate(['/myPets']) ;
  }

}
