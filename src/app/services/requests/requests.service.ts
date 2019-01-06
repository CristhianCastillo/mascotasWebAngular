import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { environment } from '@env/environment';
import * as UrlServicesConst from '../url-services/url-services';
import 'rxjs/Rx';
import { GlobalErrorHandler } from '../error-global/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) { }

  getTopRequests(idUsuario: string){
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_REQUEST_OWNER_TOP_REST}/${idUsuario}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  getRequestsDate(data: any, idUsuario: string){
    return this.http.post<any>(`${this.URL}${UrlServicesConst.SERVICE_REQUEST_OWNER_DATE_REST}/${idUsuario}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  sendResponse(data: any, id: string): Observable<any> {
    return this.http.put<any>(`${this.URL}${UrlServicesConst.SERVICE_REQUEST_SEND_RESPONSE_REST}/${id}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
