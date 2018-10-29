import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {User} from '../../models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  createUser(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/users', data, {
      //return this.http.post<Any>('https://mascotas.ga/application/mascotas/crear', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createUserOwner(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/users/owner', data, {
      //return this.http.post<Any>('https://mascotas.ga/application/mascotas/crear', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
