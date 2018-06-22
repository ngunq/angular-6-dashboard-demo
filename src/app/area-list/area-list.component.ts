import { Component, OnInit } from '@angular/core';
import { AreaFilterService } from '../area-filter.service';
import { TopGameChartService } from '../top-game-chart.service';
import { RevByMonthChartService } from '../rev-by-month-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { CategoryFilterService } from "../category-filter.service";
import { GametypeFilterService } from "../gametype-filter.service";
import { DeptFilterService } from "../dept-filter.service";
import { ProductFilterService } from "../product-filter.service";
import { AppScript } from '../app.script';
import { PuChartService } from '../pu-chart.service';
import { ArppuChartService } from '../arppu-chart.service';
@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit {

  constructor(public topGameService: TopGameChartService, private config: AppConfig, private timeService: TimeSelectService, public areaFilter: AreaFilterService, private categoryFilter: CategoryFilterService, private deptFilter: DeptFilterService, private gametypeFilter: GametypeFilterService, private revbyMonthService: RevByMonthChartService, private productFilterService: ProductFilterService, private puService: PuChartService, private arppuService: ArppuChartService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.areaFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/area?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter("", this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""));

  }

  updateChart() {
    this.topGameService.setHidden(true, false, true);
    this.revbyMonthService.setHidden(true, false, true);
    this.puService.setHidden(true, false, true);
    this.arppuService.setHidden(true, false, true);

    this.categoryFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/category?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, "", this.deptFilter.value, this.gametypeFilter.value, ""));
    this.deptFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/dept?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, "", this.gametypeFilter.value, ""));
    this.gametypeFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/gametype?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, "", ""));
    // this.productFilterService.getFilterList(this.config.getConfig("apiRootUrl") + "directory/product?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""));


    this.topGameService.loadTopGame(this.config.getConfig("apiRootUrl") + "metrics/revenue/topN?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""), "top-game-chart");
    this.revbyMonthService.loadRevByMonth(this.config.getConfig("apiRootUrl") + "metrics/revenue/?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""), this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate), "rev-by-month-chart");
    this.puService.loadPu(this.config.getConfig("apiRootUrl") + "metrics/pu/?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate).toString() + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""), this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate), "pu-chart");
    this.arppuService.loadPu(this.config.getConfig("apiRootUrl") + "metrics/arppu/?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate).toString() + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, ""), this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate), "arppu-chart");

  }
}
