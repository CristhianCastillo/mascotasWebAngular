import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as UrlNoTokenServicesConst from '@services/url-services/url-no-token-services';
import { environment } from '@env/environment';
import * as LoginConst from '@constants/login';

@Injectable()
export  class AuthInterceptor implements HttpInterceptor {
  public urlNoTokens: string[] = UrlNoTokenServicesConst.URL_SERVICES_NO_TOKEN;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const usuarioAutentificado = JSON.parse(localStorage.getItem(LoginConst.USER_SESSION));
    if(this.validateUrlWithoutToken(req.url)){
      // No token
      if (!req.headers.has('Content-Type')) {
        req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
      }
      req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
    } else {
      // Token
      req = req.clone({
        setHeaders: {
          'Authorization': usuarioAutentificado.token,
          'Content.Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    }
    return next.handle(req).do(
      succ => console.log('Succes'),
      err => {
        if(err.status === 401) {
          console.error('YOU ARE NOT AUTHENTICATED.');
        }  else {
          console.error(err);
        }
      });
  }

  validateUrlWithoutToken(url: string): boolean {
    let endPoint = environment.services['end.point'];
    for(let i = 0; i < this.urlNoTokens.length; i ++){
      let serviceTemp = endPoint + this.urlNoTokens[i];
      if(url === serviceTemp) {
        return true;
      }
    }
    return false;
  }
}
