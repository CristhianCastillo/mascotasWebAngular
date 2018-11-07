import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsAdminService {

  constructor(public http: HttpClient) { }

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  getAllRequest(idUsuario: string) {
    return this.http.get(`${this.URL}request/admin/${idUsuario}`);
  }
}
