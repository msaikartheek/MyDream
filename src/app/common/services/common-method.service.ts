import { Injectable } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodService {

  constructor() { }

  public getFormData(formControlELements) {
    console.log(formControlELements)
    let group: any = {};
    formControlELements.forEach(element => {
      if (element.label !== 'id') {
        if (element.type !== 'select') {
          group[element.label] = new FormControl('', Validators.required);
        } else {
          group[element.label] = new FormControl([''], Validators.required);
        }
      }

    });
    return new FormGroup(group);
  }
  public getFormData1(formControlELements) {
    console.log(formControlELements)
    let group: any = {};
    formControlELements.forEach(element => {
      if (element.type !== 'select') {
        group[element.label] = new FormControl('', Validators.required);
      } else {
        group[element.label] = new FormControl([''], Validators.required);
      }
    });
    return new FormGroup(group);
  }
}
