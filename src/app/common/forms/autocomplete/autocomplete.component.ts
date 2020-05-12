import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CommonMethodService } from '../../services/common-method.service';
import { DialogBoxesComponent } from '../../dialog/dialog-boxes/dialog-boxes.component';
import { MatDialog } from '@angular/material/dialog';
import { OrganisationsService } from '../../services/organisations.service';
import { DayThemeService } from '../../services/day-theme.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  constructor(private _commonMethoService: CommonMethodService, private _dialog: MatDialog,
    private _totalOrgs: OrganisationsService, private _dayTheme: DayThemeService) { }
  displayedColumns: any;
  action: String;
  index: number;

  myControl = new FormControl('');
  @Input() listOfItems: any;
  @Input() formElements: any;
  @Input() countries: any;
  filteredOptions: Observable<string[]>;
  editForm: FormGroup;

  ngOnInit(): void {
    this.displayedColumns = this.displayedColumnsData().filter(r => r !== 'id');
    this.editForm = this._commonMethoService.getFormData1(this.formElements);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)))
  }

  private displayedColumnsData() {
    return this.listOfItems.reduce(function (acc, cur) {
      return Object.keys(cur).reduce(function (a, k) {
        if (a.indexOf(k) == -1)
          a.push(k);
        return a;
      }, acc);
    }, []);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log("In _filter" + this.listOfItems)
    return this.listOfItems.filter(option => option.orgName.includes(filterValue));
  }
  editDetails(rowData: any, action: String) {
    this.editForm.setValue(rowData);
    this.action = action;
    //keep it for inline mat table edit
    //this.index = this.listOfItems.indexOf(rowData);
    console.log(this.countries)
    const editDialog = this._dialog.open(DialogBoxesComponent, {
      height: '400px',
      width: '400px',
      data: { formElements: this.formElements, countries: this.countries, rowData: this.editForm, action: action }
    })
    editDialog.afterClosed().subscribe((response) => {
      this._dayTheme.updateDayTheme(response).subscribe(response => {
        this.listOfItems = response;
      })
    });
  }

}
