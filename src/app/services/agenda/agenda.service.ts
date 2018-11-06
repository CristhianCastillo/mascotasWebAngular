import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../../models/Cita';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(public http: HttpClient) { }

  getServicesType(){
    //return this.http.get('https://mascotas.ga/application/serviceType');
    return this.http.get('http://localhost:8080/serviceType');
  }

  getServicesTypeOwner(){
    //return this.http.get('https://mascotas.ga/application/serviceType');
    return this.http.get('http://localhost:8080/serviceType/owner');
  }

  getAllAgenda(usuario: string) {
    return this.http.get(`http://localhost:8080/agenda/${usuario}`);
    //return this.http.get(`https://mascotas.ga/application/ageenda/user/${usuario}`);
  }

  createEvent(data: Cita): Observable<any> {
    return this.http.post<any>('http://localhost:8080/agenda', data, {
      //return this.http.post<any>('https://mascotas.ga/application/agenda', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateEvent(id: string, data: Cita): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/agenda/${id}`, data, {
      //return this.http.put<any>(`https://mascotas.ga/application/agenda/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/agenda/${id}`,{
      //return this.http.delete<any>(`https://mascotas.ga/application/agenda/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
