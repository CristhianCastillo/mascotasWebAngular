import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import * as HeaderConst from '../constants/header-menu';
import * as LoginConst from '../constants/login';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    /**
     * Usuario auntentificado
     */
    if ( usuarioAutentificado === null ) {
      this.router.navigate([HeaderConst.URL_LOGIN]).then(() => {}, (error) => {});
      return false;
    } else {
      /**
       * Validación tipo de usuario
       */
      if (usuarioAutentificado.tipoUsuario === LoginConst.USER_ESTABLISHMENT_OWNER ) {
        return true;
      } else if (usuarioAutentificado.tipoUsuario === LoginConst.USER_PET_OWNER ) {
        this.router.navigate([HeaderConst.URL_MASCOTAS_USUARIO]).then(() => {}, (error) => {});
        return false;
      }
    }
  }
}
