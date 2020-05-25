import { Component, OnInit } from '@angular/core';
import { HomeService } from '../common/services/home.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { CommonFormsService } from '../common/services/common-forms.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxesComponent } from '../common/dialog/dialog-boxes/dialog-boxes.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  variousListData: any;
  formElements: any;
  allFormElements: any;
  constructor(private _homeService: HomeService, private _formElements: CommonFormsService,
    private _dialog: MatDialog, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this._formElements.getFormControls().subscribe(response => {
      this.allFormElements = response;
      this.formElements = this.allFormElements.filter(f => f.collectionName === 'userDetails');
    });

    this._homeService.getListViewData().subscribe(response => {

      this.variousListData = JSON.parse(JSON.stringify(response));
      console.log(this.variousListData)
    });
  }
  login_Signup() {
    let saveDialog = this._dialog.open(DialogBoxesComponent, {
      width: '500px',
      height: '500px',
      data: { formElements: this.formElements, countries: "" }
    });
    saveDialog.afterClosed().subscribe((r) => {
      this._homeService.saveUserDetails(r).subscribe(response => {
        console.log(JSON.parse(JSON.stringify(response)));
        let username = JSON.parse(JSON.stringify(response)).username;
        this._snackBar.open("You are registered Successfully and your userName is ::: "+username, 'ok', {
          duration: 10000,
        })
      })
    });
  }
}
