import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Establecimiento} from '../../models/Establecimiento';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  getEstablishment(usuario: string): Observable<Establecimiento> {
    return this.http.get<Establecimiento>(`${this.URL}establishment/${usuario}`);
  }

  updateEstablishment(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.URL}establishment/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
