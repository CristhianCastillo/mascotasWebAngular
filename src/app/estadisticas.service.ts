import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { map } from "rxjs/operators";

@Injectable()
export class EstadisticasService {

  constructor(private _http: HttpClient) {
  }

  dailyForecast(){
    return this._http.get("http://samples.openweathermap.org/data/2.5/history/city?q=Warren,OH&appid=b6907d289e10d714a6e88b30761fae22").pipe(map(result => result));
  }

}


