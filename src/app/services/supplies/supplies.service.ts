import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Mascota} from '../../models/Mascota';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }


  getTypeSupplies(){
    return this.http.get(`${this.URL}supplieType`);
    //return this.http.get('https://mascotas.ga/application/petsType');
  }

  getAllSupplies(usuario: string) {
    return this.http.get(`${this.URL}supplie/${usuario}`);
  }

  addSupplie(data: any, idUsuario: string): Observable<any> {
    return this.http.post<any>(`${this.URL}supplie/${idUsuario}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateSupplie(data: any, idSuministro: string): Observable<any> {
    return this.http.put<any>(`${this.URL}supplie/${idSuministro}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteSuppplie(idSupplie: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}supplie/${idSupplie}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
