import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Cita} from '../../models/Cita';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(public http: HttpClient) { }

  getTopRequests(idUsuario: string){
    //return this.http.get('https://mascotas.ga/application/serviceType');
    return this.http.get(`http://localhost:8080/request/ownerTop/${idUsuario}`);
  }

  getRequestsDate(data: any, idUsuario: string){
    return this.http.post<any>(`http://localhost:8080/request/ownerDate/${idUsuario}`, data, {
      //return this.http.post<any>('https://mascotas.ga/application/agenda', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  sendResponse(data: any, id: string): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/request/sendResponse/${id}`, data, {
      //return this.http.post<any>('https://mascotas.ga/application/agenda', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
