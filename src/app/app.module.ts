import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule ,FormsModule} from '@angular/forms';
//import { DemoMaterialModule } from './material.module';
import { CommonFormsComponent } from './common/forms/common-forms/common-forms.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganisationsComponent } from './organisations/organisations.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './common/modules/material.module';
import { AutocompleteComponent } from './common/forms/autocomplete/autocomplete.component';
import { DialogBoxesComponent } from './common/dialog/dialog-boxes/dialog-boxes.component';
import { DaysandThemeComponent } from './daysand-theme/daysand-theme.component';

@NgModule({
  declarations: [
    AppComponent,
    CommonFormsComponent,
    OrganisationsComponent,
    HomeComponent,
    AutocompleteComponent,
    DialogBoxesComponent,
    DaysandThemeComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule, BrowserAnimationsModule,
    ReactiveFormsModule, MaterialModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
