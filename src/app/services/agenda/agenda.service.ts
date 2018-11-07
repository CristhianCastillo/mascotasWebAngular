import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '../../models/Cita';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  getServicesType(){
    return this.http.get(`${this.URL}serviceType`);
  }

  getServicesTypeOwner(){
    return this.http.get(`${this.URL}serviceType/owner`);
  }

  getAllAgenda(usuario: string) {
    return this.http.get(`${this.URL}agenda/${usuario}`);
  }

  createEvent(data: Cita): Observable<any> {
    return this.http.post<any>(`${this.URL}agenda`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateEvent(id: string, data: Cita): Observable<any> {
    return this.http.put<any>(`${this.URL}agenda/${id}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}agenda/${id}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
