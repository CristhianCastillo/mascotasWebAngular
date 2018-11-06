import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Mascota} from '../../models/Mascota';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  constructor(public http: HttpClient) { }


  getTypeSupplies(){
    return this.http.get('http://localhost:8080/supplieType');
    //return this.http.get('https://mascotas.ga/application/petsType');
  }

  getAllSupplies(usuario: string) {
    return this.http.get(`http://localhost:8080/supplie/${usuario}`);
    //return this.http.get(`https://mascotas.ga/application/pets/user/${usuario}`);
  }

  addSupplie(data: any, idUsuario: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/supplie/${idUsuario}`, data, {
      //return this.http.post<any>('https://mascotas.ga/application/pets', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updateSupplie(data: any, idSuministro: string): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/supplie/${idSuministro}`, data, {
      //return this.http.put<any>(`https://mascotas.ga/application/pets/${idMascota}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deleteSuppplie(idSupplie: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/supplie/${idSupplie}`,{
      //return this.http.delete<any>(`https://mascotas.ga/application/pets/${idMascota}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
