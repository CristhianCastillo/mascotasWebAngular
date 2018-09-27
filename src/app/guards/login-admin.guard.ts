import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    /**
     * Usuario auntentificado
     */
    if ( usuarioAutentificado === null ) {
      this.router.navigate(['/login']);
      return false;
    } else {
      /**
       * Validación tipo de usuario
       */
      if (usuarioAutentificado.tipoUsuario === 'Propietario' ) {
        return true;
      } else if (usuarioAutentificado.tipoUsuario === 'Usuario' ) {
        this.router.navigate(['/myPets']);
        return false;
      }
    }
  }
}
