import { Component, OnInit } from '@angular/core';
import { GrossRevService } from "../gross-rev.service";
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";

@Component({
  selector: 'app-gross-rev',
  templateUrl: './gross-rev.component.html',
  styleUrls: ['./gross-rev.component.css']
})
export class GrossRevComponent implements OnInit {

  constructor(public service: GrossRevService, private config: AppConfig, public timeService: TimeSelectService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.service.setHidden(true, false, true);
    this.service.getGrossRev(this.config.getConfig("apiRootUrl") + "metrics/revenue/total?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate));

  }
}
