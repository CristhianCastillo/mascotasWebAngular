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
export class RegisterService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) { }

  createUser(data: any, owner: boolean): Observable<any> {
    let url = '';
    if(owner) {
      url = `${this.URL}${UrlServicesConst.SERVICE_USER_OWNER_REST}`;
    } else {
      url = `${this.URL}${UrlServicesConst.SERVICE_USER_USER_REST}`;
    }
    return this.http.post<any>(url, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
