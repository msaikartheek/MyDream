import { Component, OnInit } from '@angular/core';
import { DialogBoxesComponent } from '../common/dialog/dialog-boxes/dialog-boxes.component';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CommonFormsService } from '../common/services/common-forms.service';
import { DayThemeService } from '../common/services/day-theme.service';

@Component({
  selector: 'app-daysand-theme',
  templateUrl: './daysand-theme.component.html',
  styleUrls: ['./daysand-theme.component.css']
})
export class DaysandThemeComponent implements OnInit {
  allFormElemnts: any;
  formElemnts: any;
  options: any;
  countries: any;

  constructor(private activatedRoute: ActivatedRoute,
    private _dayTheme: DayThemeService,
    private _dialog: MatDialog) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(response => {
      this.formElemnts = response['resolverData'][0];
      this.allFormElemnts = this.formElemnts.filter(f => f.collectionName === 'dayTheme');
      this.options = response['resolverData'][1];
    });
  }
  openDialogBox() {
    let saveDialog = this._dialog.open(DialogBoxesComponent, {
      width: '500px',
      height: '500px',
      data: { formElements: this.allFormElemnts, countries: "" }
    });
    saveDialog.afterClosed().subscribe((r) => {
      this._dayTheme.addDay_Theme(r).subscribe(response => this.options = response
      );
    });
  }
}
