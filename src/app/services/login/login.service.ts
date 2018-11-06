import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient) { }

  loginUser(data): Observable<any> {
    return this.http.post<any>('http://localhost:8080/user/login', data, {
    //return this.http.post<any>('https://mascotas.ga/application/user/login', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
