import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class CurrencyService {
  private API_KEY = '03b58da3a3ab45db87855e6e3bdf8822';
  constructor(private http: Http) { }

  getCurrency(): Observable<any>  {
    return this.http.get(`https://openexchangerates.org/api/latest.json?app_id=${this.API_KEY}`)
            .map(res => res.json())
            .catch(error => error);
  }
}
