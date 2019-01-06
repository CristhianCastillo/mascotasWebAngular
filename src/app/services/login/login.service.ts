import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';
import * as UrlServicesConst from '../url-services/url-services';
import 'rxjs/Rx';
import { GlobalErrorHandler } from '../error-global/global-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public URL: string = environment.services['end.point'];
  constructor(public http: HttpClient) { }

  loginUser(data): Observable<any> {
    return this.http.post<any>(`${this.URL}${UrlServicesConst.SERVICE_USER_LOGIN_REST}`, data).map(
      (response) => {
        return response;
      }, err => {
        console.error(err);
      }
    ).pipe(catchError(GlobalErrorHandler.handleErrorRequest));
  }
}
