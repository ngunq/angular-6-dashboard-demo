import { Component, OnInit } from '@angular/core';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AreaFilterService } from "../area-filter.service";
import { CategoryFilterService } from "../category-filter.service";
import { GametypeFilterService } from "../gametype-filter.service";
import { DeptFilterService } from "../dept-filter.service";
import { ProductFilterService } from "../product-filter.service";
import { AppScript } from '../app.script';
import { ArppuChartService } from "../arppu-chart.service";
@Component({
  selector: 'app-arppu-chart',
  templateUrl: './arppu-chart.component.html',
  styleUrls: ['./arppu-chart.component.css']
})
export class ArppuChartComponent implements OnInit {

  constructor(public chartService: ArppuChartService, private config: AppConfig, public timeService: TimeSelectService, private areaFilter: AreaFilterService, private categoryFilter: CategoryFilterService, private deptFilter: DeptFilterService, private gametypeFilter: GametypeFilterService, private productFilter: ProductFilterService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load() {
    this.chartService.setHidden(true, false, true);
    let time_select = this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate);
    this.chartService.loadPu(this.config.getConfig("apiRootUrl") + "metrics/arppu/?time_unit=" + this.timeService.unit + "&time_select=" + time_select + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""), time_select, "arppu-chart");
  }

}
