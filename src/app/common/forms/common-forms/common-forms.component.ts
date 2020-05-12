import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-common-forms',
  templateUrl: './common-forms.component.html',
  styleUrls: ['./common-forms.component.css']
})
export class CommonFormsComponent implements OnInit {
  formControlELements: any;
  @Input() form: FormGroup;
  @Input() formElements : any;
  @Input() countries:any;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
}
