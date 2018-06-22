import { Component, OnInit } from '@angular/core';
import { VsLastTimeService } from "../vs-last-time.service";
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
@Component({
  selector: 'app-vs-last-time',
  templateUrl: './vs-last-time.component.html',
  styleUrls: ['./vs-last-time.component.css']
})
export class VsLastTimeComponent implements OnInit {

  constructor(public service: VsLastTimeService, private config: AppConfig, private timeService: TimeSelectService) { }

  ngOnInit() {
    this.load();
  }

  load(){
    this.service.setHidden(true, false, true);
    this.service.getPercent(this.config.getConfig("apiRootUrl") + "metrics/revenue/ctlm?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate));
  }
}
