import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Establecimiento} from '../../models/Establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  constructor(public http: HttpClient) { }

  getEstablishment(usuario: string): Observable<Establecimiento> {
    return this.http.get<Establecimiento>(`http://localhost:8080/establishment/${usuario}`);
    //return this.http.get(`https://mascotas.ga/application/establishment${usuario}`);
  }

  updateEstablishment(id: string, data: any): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/establishment/${id}`, data, {
      //return this.http.put<any>(`https://mascotas.ga/application/establishment/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
