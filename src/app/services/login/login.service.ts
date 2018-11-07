import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  loginUser(data): Observable<any> {
    return this.http.post<any>(`${this.URL}user/login`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
