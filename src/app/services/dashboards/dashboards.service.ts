import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import { environment } from '@env/environment';
import * as UrlServicesConst from '@services/url-services/url-services';
import 'rxjs/Rx';
import { GlobalErrorHandler } from '@services/error-global/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) { }

  getCountServices(id: string) {
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_DASHBOARDS_COUNT_SERVICES_REST}/${id}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }

  getCountQualify(id: string) {
    return this.http.get(`${this.URL}${UrlServicesConst.SERVICE_DASHBOARDS_COUNT_RATINGS_REST}/${id}`).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
