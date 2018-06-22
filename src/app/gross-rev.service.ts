import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppScript } from './app.script';

@Injectable({
  providedIn: 'root'
})
export class GrossRevService {

  hidden: boolean = true;
  loader: boolean = false;
  reload: boolean = true;
  grossRevenue: string = "";

  constructor(private http: HttpClient) { }

  getGrossRev(url: string) {
    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        this.grossRevenue = AppScript.numberWithCommas((response / 1000000000).toFixed(2)) + " tỷ";
        this.setHidden(false, true, true);
      } else {
        this.setHidden(true, true, false);
      }
    }, error => {
      this.setHidden(true, true, false);
    });
  }

  setHidden(hidden: boolean, loader: boolean, reload: boolean) {
    this.hidden = hidden;
    this.loader = loader;
    this.reload = reload;
  }
}
