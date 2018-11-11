import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  public URL: string = 'https://mascotas.ga/application/';
  //public URL: string = 'http://localhost:8080/';
  constructor(public http: HttpClient) { }

  getCountServices(id: string) {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    return this.http.get(`${this.URL}DashBoards/countByServices/${id}`, {
      headers: new HttpHeaders({
        'Authorization': usuarioAutentificado.token
      })
    }).pipe(catchError(this.handleError));
  }

  getCountQualify(id: string) {
    const usuarioAutentificado = JSON.parse(localStorage.getItem('user'));
    return this.http.get(`${this.URL}DashBoards/countRatings/${id}`, {
      headers: new HttpHeaders({
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
