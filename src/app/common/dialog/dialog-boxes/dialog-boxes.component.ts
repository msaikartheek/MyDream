import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrganisationsService } from '../../services/organisations.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonMethodService } from '../../services/common-method.service';

@Component({
  selector: 'app-dialog-boxes',
  templateUrl: './dialog-boxes.component.html',
  styleUrls: ['./dialog-boxes.component.css']
})
export class DialogBoxesComponent implements OnInit {
  allFormElemnts: any;
  form: FormGroup;
  editForm: FormGroup;
  countries: any;
  action: String;
  value: any;

  constructor(public dialogRef: MatDialogRef<DialogBoxesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _orgsService: OrganisationsService,
    private _dialog: MatDialog, private _snackBar: MatSnackBar, private _commonMethoService: CommonMethodService) {

    this.allFormElemnts = data['formElements'];
    this.countries = data['countries'];
console.log(data)
    if (data['action'] === 'Edit') {
      this.editForm = data['rowData'];
      this.action = data['action'];
    }
  }

  ngOnInit(): void {
    this.form = this._commonMethoService.getFormData(this.allFormElemnts);
  }
  onSubmit() {
   // return this._orgsService.addAnOrganisation(this.form.value).subscribe(response => {
      this.dialogRef.close(this.form.value);
    //});

  }
  onEdit() {
    //console.log(this.editForm)
    //return this._orgsService.updateOrganisation(this.editForm.value).subscribe(response => {
      this.dialogRef.close(this.editForm.value);
    //}
    //);
  }
}
