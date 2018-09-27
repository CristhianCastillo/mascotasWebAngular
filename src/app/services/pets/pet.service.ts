import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../../models/Mascota';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(public http: HttpClient) { }
  getAllPets() {
    //return this.http.get('http://localhost:8080/pets');
    return this.http.get('https://mascotas.ga/application/mascotas/obtenerTodos');
  }

  createPet(data: Mascota): Observable<Mascota> {
    //return this.http.post<Mascota>('http://localhost:8080/pets', data, {
    return this.http.post<Mascota>('https://mascotas.ga/application/mascotas/crear', data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  updatePet(idMascota: number, data: Mascota): Observable<boolean> {
    //return this.http.put<boolean>(`http://localhost:8080/pets/${idMascota}`, data, {
    return this.http.put<boolean>(`https://mascotas.ga/application/mascotas/actualizar/${idMascota}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  deletePet(idMascota: Number): Observable<boolean> {
    //return this.http.delete<boolean>(`http://localhost:8080/pets/${idMascota}`,{
    return this.http.delete<boolean>(`https://mascotas.ga/application/mascotas/borrar/${idMascota}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
