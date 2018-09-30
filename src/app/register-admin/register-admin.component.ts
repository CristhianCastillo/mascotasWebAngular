import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ScrollTopService } from '../services/scroll-top.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute, private router: Router,
              private scrollTop: ScrollTopService) { }

  ngOnInit() {
    this.scrollTop.setScrollTop();
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
