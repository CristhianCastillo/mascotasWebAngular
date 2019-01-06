import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mascota } from '../../models/Mascota';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as UrlServicesConst from '../url-services/url-services';
import 'rxjs/Rx';
import { GlobalErrorHandler } from '../error-global/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) { }

  getTypePets(){
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_TYPE_PETS_REST}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  getAllPets(usuario: string) {
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_PETS_REST}/${usuario}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  createPet(data: Mascota): Observable<any> {
    return this.http.post<any>(`${this.URL}${UrlServicesConst.SERVICE_PETS_REST}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  updatePet(idMascota: string, data: Mascota): Observable<any> {
    return this.http.put<any>(`${this.URL}${UrlServicesConst.SERVICE_PETS_REST}/${idMascota}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  deletePet(idMascota: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}${UrlServicesConst.SERVICE_PETS_REST}/${idMascota}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
