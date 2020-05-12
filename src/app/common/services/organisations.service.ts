import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganisationsService {
  
  api: string = "/api/";

  constructor(private _http: HttpClient) { }

  getAllOrganisations() {
    return this._http.get(this.api + 'getAllOrganisations').pipe(map(data => data));
  }
  addAnOrganisation(organisation: any) {
    return this._http.post(this.api + 'addOrganisation',organisation).pipe(map(data => data));
  }
  getCountries(): any {
    return this._http.get(this.api + 'getCountries').pipe(map(data => data));
  }
  updateOrganisation(organisation: any) {
    return this._http.put(this.api + 'updateOrganisationDetails',organisation).pipe(map(data => data));
  }
}
