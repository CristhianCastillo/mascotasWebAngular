import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public http: HttpClient) { }

  createUser(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/user/user', data, {
    //return this.http.post<any>('https://mascotas.ga/application/user/user', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  createUserOwner(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/user/owner', data, {
    //return this.http.post<any>('https://mascotas.ga/application/user/owner', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
