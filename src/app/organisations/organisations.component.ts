import { Component, OnInit } from '@angular/core';
import { CommonFormsService } from '../common/services/common-forms.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { OrganisationsService } from '../common/services/organisations.service';
import { DialogBoxesComponent } from '../common/dialog/dialog-boxes/dialog-boxes.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-organisations',
  templateUrl: './organisations.component.html',
  styleUrls: ['./organisations.component.css']
})
export class OrganisationsComponent implements OnInit {
  allFormElemnts: any;
  formElemnts: any;
  options: any;
  countries: any;

  constructor(private _commonFormElemnts: CommonFormsService, private activatedRoute: ActivatedRoute, 
    private _orgService: OrganisationsService, private _dialog: MatDialog) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => {
      this.formElemnts = response['resolverData'][0];
      this.allFormElemnts = this.formElemnts.filter(f => f.collectionName === 'orgs');
      this.options = response['resolverData'][1];
      //this.countries = response['resolverData'][2]
    });
    this._orgService.getCountries().subscribe(response => this.countries = response);
  }
  openDialogBox() {
  let saveDialog = this._dialog.open(DialogBoxesComponent, {
      width: '500px',
      height: '500px',
      data:{formElements:this.allFormElemnts,countries:this.countries}
    });
    saveDialog.afterClosed().subscribe((r)=> {
      this._orgService.addAnOrganisation(r).subscribe(response => this.options =  response);
    });
  }


}
