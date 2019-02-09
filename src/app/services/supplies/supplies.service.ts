import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as UrlServicesConst from '@services/url-services/url-services';
import 'rxjs/Rx';
import { GlobalErrorHandler } from '@services/error-global/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SuppliesService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) { }

  getTypeSupplies(){
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_SUPPLIE_TYPE_REST}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  getAllSupplies(usuario: string) {
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_SUPPLIE_RETRIVE_REST}/${usuario}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  addSupplie(data: any, idUsuario: string): Observable<any> {
    return this.http.post<any>(`${this.URL}${UrlServicesConst.SERVICE_SUPPLIE_CREATE_REST}/${idUsuario}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  updateSupplie(data: any, idSuministro: string): Observable<any> {
    return this.http.put<any>(`${this.URL}${UrlServicesConst.SERVICE_SUPPLIE_UPDATE_REST}/${idSuministro}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  deleteSuppplie(idSupplie: string): Observable<any> {
    return this.http.delete<any>(`${this.URL}${UrlServicesConst.SERVICE_SUPPLIE_DELETE_REST}/${idSupplie}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
