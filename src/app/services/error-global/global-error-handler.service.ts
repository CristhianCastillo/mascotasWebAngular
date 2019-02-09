import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import * as HeaderConst from '@constants/header-menu';
import {throwError} from 'rxjs';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    const router = this.injector.get(Router);
    console.log(`Request URL: ${router.url}`);

    if (error instanceof HttpErrorResponse ) {
      console.error('Backend returned status code:' , error.status);
      console.error('Response body: ', error.message);
    } else {
      console.error('And error ocurred:', error.message);
    }
    router.navigate([HeaderConst.URL_ERROR]).then(() =>{});
  }

  static handleErrorRequest(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
