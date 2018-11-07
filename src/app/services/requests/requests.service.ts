import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cita} from '../../models/Cita';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  getTopRequests(idUsuario: string){
    return this.http.get(`${this.URL}request/ownerTop/${idUsuario}`);
  }

  getRequestsDate(data: any, idUsuario: string){
    return this.http.post<any>(`${this.URL}request/ownerDate/${idUsuario}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sendResponse(data: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.URL}request/sendResponse/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
