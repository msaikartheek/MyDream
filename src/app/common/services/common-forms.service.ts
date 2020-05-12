import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { FormControlModule } from '../modules/form-control-module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonFormsService {

  constructor(private _http: HttpClient) { }
  private api: String = '/api/';

  getFormControls() : Observable<any>{
    return this._http.get(this.api + 'getFormElements').pipe(map(data => data));
  }
}
