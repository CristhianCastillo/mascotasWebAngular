import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cita } from '@models/Cita';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as UrlServicesConst from '@services/url-services/url-services';
import 'rxjs/Rx';
import { GlobalErrorHandler } from '@services/error-global/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) {
  }

  getServicesType() {
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_TYPE_REST}`).map(
      (response) => {
        return response;
      }, err => {
         console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  getServicesTypeOwner() {
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_TYPE_OWNER_REST}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  getAllAgenda(usuario: string) {
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_AGENDA_RETRIVE_REST}/${usuario}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  createEvent(data: Cita): Observable<any> {
    return this.http.post<any>(`${this.URL}${UrlServicesConst.SERVICE_AGENDA_CREATE_REST}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  updateEvent(id: string, data: Cita): Observable<any> {
    return this.http.put<any>(`${this.URL}${UrlServicesConst.SERVICE_AGENDA_UPDATE_REST}/${id}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  deleteEvent(id: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}${UrlServicesConst.SERVICE_AGENDA_DELETE_REST}/${id}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
