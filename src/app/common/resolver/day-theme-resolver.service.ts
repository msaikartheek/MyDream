import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CommonFormsService } from '../services/common-forms.service';
import { withLatestFrom } from 'rxjs/operators';
import { DayThemeService } from '../services/day-theme.service';

@Injectable({
  providedIn: 'root'
})
export class DayThemeResolverService  implements Resolve<any>{

  constructor(private _formELemnts: CommonFormsService,private _daytheme: DayThemeService) { }
  resolve(route: import("@angular/router").ActivatedRouteSnapshot, state: import("@angular/router").RouterStateSnapshot) {
    return this._formELemnts.getFormControls().pipe(withLatestFrom(
      this._daytheme.getAllDays_Theme()
    ));
  }
}
