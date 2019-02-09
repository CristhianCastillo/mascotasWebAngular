import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { environment } from '@env/environment';
import * as HeaderConst from '@constants/header-menu';
import * as LoginConst from '@constants/login';
import * as MenuConst from '@constants/menu';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {

  public isExpanded = false;
  public tipoMenu: string;
  public propiedades: any = environment.components.header;
  public urls: any;
  public variables: any;
  public menuPublico = [
    {id: 0, name: this.propiedades['label.menu.home'], url: HeaderConst.URL_HOME},
    {id: 1, name: this.propiedades['label.menu.login'], url: HeaderConst.URL_LOGIN},
    {id: 2, name: this.propiedades['label.menu.register'], url: HeaderConst.URL_REGISTER},
  ];
  public menuPropietario = [
    {id: 0, name: this.propiedades['label.menu.home'], url: HeaderConst.URL_HOME},
    {id: 1, name: this.propiedades['label.menu.establishment'], url: HeaderConst.URL_ESTABLISHMENT},
    {id: 2, name: this.propiedades['label.menu.solicitudes.propietario'], url: HeaderConst.URL_SOLICITUDES},
    {id: 3, name: this.propiedades['label.menu.suministros.propietario'], url: HeaderConst.URL_SUPPLIES_ADMIN},
    {id: 4, name: this.propiedades['label.menu.estadisticas'], url: HeaderConst.URL_ESTADISTICAS}
  ];
  public menuUsuario = [
    {id: 0, name: this.propiedades['label.menu.home'], url: HeaderConst.URL_HOME},
    {id: 1, name: this.propiedades['label.menu.mascotas.usuario'], url: HeaderConst.URL_MASCOTAS_USUARIO},
    {id: 3, name: this.propiedades['label.menu.agenda.usuario'], url: HeaderConst.URL_AGENDA},
    {id: 4, name: this.propiedades['label.menu.suministros.usuario'], url: HeaderConst.URL_SUPPLIES}
  ];
  constructor(private router: Router) {
    this.urls = HeaderConst;
    this.variables = environment;
  }

  ngOnInit() {
  }

  trackByFn(index, item) {
    return item.id;
  }

  selectUserType() {
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    /**
     * Usuario auntentificado
     */
    if ( usuarioAutentificado === null ) {
      this.tipoMenu = MenuConst.MENU_PUBLIC;
      return true;
    }
    /**
     * Validación tipo de usuario
     */
    if (usuarioAutentificado.tipoUsuario === LoginConst.USER_ESTABLISHMENT_OWNER ) {
      this.tipoMenu = MenuConst.MENU_ESTABLISHMENT_OWNER;
      return true;
    } else if (usuarioAutentificado.tipoUsuario === LoginConst.USER_PET_OWNER ) {
      this.tipoMenu = MenuConst.MENU_PET_OWNER;
      return true;
    }
  }

  goToLogout() {
    localStorage.removeItem(LoginConst.USER_SESSION);
    this.router.navigate([HeaderConst.URL_LOGIN]).then(() => {
    });
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
