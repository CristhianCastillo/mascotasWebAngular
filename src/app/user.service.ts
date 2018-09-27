import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public tipoUsuario: string;
  constructor() {
    this.tipoUsuario = 'tipoUsuario';
  }
  get state() {
    return this.tipoUsuario;
  }
  set(nuevoEstado: string) {
    this.tipoUsuario = nuevoEstado;
  }
}
