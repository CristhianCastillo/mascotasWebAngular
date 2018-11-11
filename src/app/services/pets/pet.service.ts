import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import { Mascota } from '../../models/Mascota';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  getTypePets(){
    return this.http.get(`${this.URL}petType`);
  }

  getAllPets(usuario: string) {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    return this.http.get(`${this.URL}pet/${usuario}`, {
      headers: new HttpHeaders({
        'Authorization': usuarioAutentificado.token
      })
    }).pipe(catchError(this.handleError));
  }

  createPet(data: Mascota): Observable<any> {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    return this.http.post<any>(`${this.URL}pet`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': usuarioAutentificado.token
      })
    }).pipe(catchError(this.handleError));
  }

  updatePet(idMascota: string, data: Mascota): Observable<any> {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    return this.http.put<any>(`${this.URL}pet/${idMascota}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': usuarioAutentificado.token
      })
    }).pipe(catchError(this.handleError));
  }

  deletePet(idMascota: string): Observable<any> {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    return this.http.delete<any>(`${this.URL}pet/${idMascota}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': usuarioAutentificado.token
      })
    }).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
