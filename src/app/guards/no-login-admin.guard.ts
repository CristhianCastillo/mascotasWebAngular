import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoLoginAdminGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    /**
     * Usuario auntentificado
     */
    if ( usuarioAutentificado === null ) {
      return true;
    } else {
      if (usuarioAutentificado.tipoUsuario === 'Propietario' ) {
        this.router.navigate(['/establishment']);
        return false;
      } else if (usuarioAutentificado.tipoUsuario === 'Usuario' ) {
        this.router.navigate(['/myPets']);
        return false;
      }
    }
  }
}
