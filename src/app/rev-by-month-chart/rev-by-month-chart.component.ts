import { Component, OnInit } from '@angular/core';
import { RevByMonthChartService } from '../rev-by-month-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AreaFilterService } from "../area-filter.service";
import { CategoryFilterService } from "../category-filter.service";
import { GametypeFilterService } from "../gametype-filter.service";
import { DeptFilterService } from "../dept-filter.service";
// import { ProductFilterService } from "../product-filter.service";
import { AppScript } from '../app.script';

@Component({
  selector: 'app-rev-by-month-chart',
  templateUrl: './rev-by-month-chart.component.html',
  styleUrls: ['./rev-by-month-chart.component.css']
})
export class RevByMonthChartComponent implements OnInit {


  constructor(public chartService: RevByMonthChartService, private config: AppConfig, public timeService: TimeSelectService, private areaFilter: AreaFilterService, private categoryFilter: CategoryFilterService, private deptFilter: DeptFilterService, private gametypeFilter: GametypeFilterService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load() {
    this.chartService.setHidden(true, false, true);
    let time_select = this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate);
    this.chartService.loadRevByMonth(this.config.getConfig("apiRootUrl") + "metrics/revenue/?time_unit=" + this.timeService.unit + "&time_select=" + time_select + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""), time_select, "rev-by-month-chart");
  }
}
