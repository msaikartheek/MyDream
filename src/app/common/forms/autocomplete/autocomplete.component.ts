import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { CommonMethodService } from '../../services/common-method.service';
import { DialogBoxesComponent } from '../../dialog/dialog-boxes/dialog-boxes.component';
import { MatDialog } from '@angular/material/dialog';
import { OrganisationsService } from '../../services/organisations.service';
import { DayThemeService } from '../../services/day-theme.service';
import { MatTableDataSource } from '@angular/material/table';
import { isUndefined, isNullOrUndefined } from 'util';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  displayedColumns: any;
  action: String;
  index: number;

  myControl = new FormControl('');
  @Input() listOfItems: any;
  @Input() formElements: any;
  @Input() countries: any;
  filteredOptions: Observable<string[]>;
  editForm: FormGroup;
  isAuthorised: boolean = false;

  constructor(private _commonMethoService: CommonMethodService, private _dialog: MatDialog,
    private _totalOrgs: OrganisationsService, private _dayTheme: DayThemeService) { }


  ngOnInit(): void {
    this.dataSource = this.listOfItems;
    console.log(this.listOfItems);
    this.displayedColumns = this.displayedColumnsData().filter(r => r !== 'id').concat('action');
    console.log("form Elements ----- " + this.displayedColumns);
    console.log(this.formElements)
    if (!isNullOrUndefined(this.formElements)) {
      this.editForm = this._commonMethoService.getFormData1(this.formElements);
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value)))
    }

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
      width: 'auto',
      height: 'auto',
      data: { formElements: this.formElements, countries: this.countries, rowData: this.editForm, action: action }
    })
    editDialog.afterClosed().subscribe((response) => {
      this._dayTheme.updateDayTheme(response).subscribe(response => {
        this.listOfItems = response;
      })
    });
  }
  applyFilter(event: Event) {
    console.log(event)
    const filterValue = (event.target as HTMLInputElement).value;
    console.log(filterValue)
    this.dataSource = new MatTableDataSource(this.listOfItems);
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
  }
  check(columnName) {
    if (columnName !== 'members' && columnName !== 'action') {
      return true;
    } else {
      return false;
    }
  }
  deleteDetails(selectedColumn,action:String){

  }

}
