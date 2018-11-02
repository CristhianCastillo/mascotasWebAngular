import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../../models/Mascota';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(public http: HttpClient) { }

  getTypePets(){
    //return this.http.get('http://localhost:8080/petsType');
    return this.http.get('https://mascotas.ga/application/petsType');
  }

  getAllPets(usuario: string) {
    //return this.http.get(`http://localhost:8080/pets/user/${usuario}`);
    return this.http.get(`https://mascotas.ga/application/pets/user/${usuario}`);
  }

  createPet(data: Mascota): Observable<any> {
    //return this.http.post<any>('http://localhost:8080/pets', data, {
    return this.http.post<any>('https://mascotas.ga/application/pets', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updatePet(idMascota: string, data: Mascota): Observable<any> {
    //return this.http.put<any>(`http://localhost:8080/pets/${idMascota}`, data, {
    return this.http.put<any>(`https://mascotas.ga/application/pets/${idMascota}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deletePet(idMascota: string): Observable<any> {
    //return this.http.delete<any>(`http://localhost:8080/pets/${idMascota}`,{
    return this.http.delete<any>(`https://mascotas.ga/application/pets/${idMascota}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
