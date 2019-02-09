import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import * as HeaderConst from '@constants/header-menu';
import * as LoginConst from '@constants/login';

@Injectable({
  providedIn: 'root'
})
export class LoginUserGuard implements CanActivate {
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
      if (usuarioAutentificado.tipoUsuario === LoginConst.USER_ESTABLISHMENT_OWNER ) {
        this.router.navigate([HeaderConst.URL_ESTABLISHMENT]).then(() => {}, (error) => {});
        return false;
      } else if (usuarioAutentificado.tipoUsuario === LoginConst.USER_PET_OWNER ) {
        return true;
      }
    }
  }
}
