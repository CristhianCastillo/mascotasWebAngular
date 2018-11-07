import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  getCountServices(id: string) {
    return this.http.get(`${this.URL}DashBoards/countByServices/${id}`);
  }

  getCountQualify(id: string) {
    return this.http.get(`${this.URL}DashBoards/countRatings/${id}`);
  }
}
