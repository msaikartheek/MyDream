import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DayThemeService {
  
  
  api: string = "/api/";

  constructor(private _httpClient : HttpClient) { }

  getAllDays_Theme() {
    return this._httpClient.get(this.api + 'getDayTheme').pipe(map(data => data));
  }
  addDay_Theme(dayTheme: any) {
    return this._httpClient.post(this.api + 'addDayTheme',dayTheme).pipe(map(data => data));
  }
  updateDayTheme(dayThemeUpdated: any) {
    return this._httpClient.put(this.api + 'updateDayTheme',dayThemeUpdated).pipe(map(data => data));
  }
}
