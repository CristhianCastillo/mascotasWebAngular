import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor(public http: HttpClient) { }

  getCountServices(id: string) {
    //return this.http.get('http://localhost:8080/pets');
    return this.http.get(`http://localhost:8080/DashBoards/countByServices/${id}`);
  }

  getCountQualify(id: string) {
    //return this.http.get('http://localhost:8080/pets');
    return this.http.get(`http://localhost:8080/DashBoards/countRatings/${id}`);
  }
}
