import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  public isExpanded = false;
  public tipoMenu: string;
  constructor(private router: Router) {}
  ngOnInit() {
  }

  tipoUsuario() {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    /**
     * Usuario auntentificado
     */
    if ( usuarioAutentificado === null ) {
      this.tipoMenu = 'menuPublico';
      return true;
    }
    /**
     * Validación tipo de usuario
     */
    if (usuarioAutentificado.tipoUsuario === 'Propietario' ) {
      this.tipoMenu = 'menuPropietario';
      return true;
    } else if (usuarioAutentificado.tipoUsuario === 'Usuario' ) {
      this.tipoMenu = 'menuUsuario';
      return true;
    }
  }

  goToLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  collapse() {
    this.isExpanded = false;
    console.log('Intentando cerrar');
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
