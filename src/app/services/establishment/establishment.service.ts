import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Establecimiento} from '@models/Establecimiento';
import { catchError} from 'rxjs/operators';
import { environment } from '@env/environment';
import * as UrlServicesConst from '@services/url-services/url-services';
import 'rxjs/Rx';
import { GlobalErrorHandler } from '@services/error-global/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class EstablishmentService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) { }

  getEstablishment(usuario: string): Observable<Establecimiento> {
    return this.http.get<Establecimiento>(`${this.URL}${UrlServicesConst.SERVICE_ESTABLISHMENT_RETRIVE_REST}/${usuario}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  updateEstablishment(id: string, data: any): Observable<any> {
    return this.http.put<any>(`${this.URL}${UrlServicesConst.SERVICE_ESTABLISHMENT_UPDATE_REST}/${id}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
