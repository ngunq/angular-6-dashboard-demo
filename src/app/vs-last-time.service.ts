import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VsLastTimeService {

  hidden: boolean = true;
  loader: boolean = false;
  reload: boolean = true;
  percent: string = "";

  constructor(private http: HttpClient) { }

  getPercent(url: string) {
    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        this.percent = response.toFixed(2) + "%";
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
