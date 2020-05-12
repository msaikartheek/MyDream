import { Injectable } from '@angular/core';
import { CommonFormsService } from './common/services/common-forms.service';
import { Resolve } from '@angular/router';
import { OrganisationsService } from './common/services/organisations.service';
import { withLatestFrom } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResolverService implements Resolve<any>{

  constructor(private _formELemnts: CommonFormsService,private _orgsService : OrganisationsService) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this._formELemnts.getFormControls().pipe(
      withLatestFrom(
      this._orgsService.getAllOrganisations()//,this._orgsService.getCountries()
    ));
  }

 /* resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return forkJoin([
      this._formELemnts.getFormControls(),
            this._elementsService.getDepartments()
            .catch(error => {

                /* if(error.status === 404) {
                    this.router.navigate(['subscription-create']);
                }

                return Observable.throw(error);
            })
    ]).map(result => {
        return {
            types: result[0],
            departments: result[1]
        };
    });
}; */
}
