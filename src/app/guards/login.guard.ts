import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import * as LoginConst from '../constants/login';
import * as HeaderConst from '../constants/header-menu';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    /**
     * Usuario autentificado
     */
    if(usuarioAutentificado === null) {
      this.router.navigate([HeaderConst.URL_LOGIN]).then(() => {}, (error) => {});
      return false;
    } else {
      return true;
    }
  }
}
