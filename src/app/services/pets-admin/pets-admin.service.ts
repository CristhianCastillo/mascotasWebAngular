import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsAdminService {

  constructor(public http: HttpClient) { }

  getAllRequest(idUsuario: string) {
    return this.http.get(`http://localhost:8080/request/admin/${idUsuario}`);
    //return this.http.get(`https://mascotas.ga/application/request/admin/${idUsuario}`);
  }
}
