import { Injectable } from '@angular/core';
import { TimeSelectService } from "./time-select.service";
import { AppConfig } from "./app.config";

@Injectable({
  providedIn: 'root'
})
export class RevTimeSelectService {
  revTimeValue: string = "";
  revTimeSelect: Object[] = [];

  constructor(private timeService: TimeSelectService, private config: AppConfig) { }

  init() {
    this.revTimeSelect = this.timeService.getRevTimeSelect(this.config.getConfig("startTime"));
    this.revTimeValue = this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate).toString();
  }
}
