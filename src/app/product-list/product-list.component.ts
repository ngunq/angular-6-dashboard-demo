import { Component, OnInit } from '@angular/core';
import { ProductFilterService } from '../product-filter.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { GametypeFilterService } from '../gametype-filter.service';
import { DeptFilterService } from '../dept-filter.service';
import { CategoryFilterService } from '../category-filter.service';
import { TopGameChartService } from '../top-game-chart.service';
import { AreaFilterService } from "../area-filter.service";
import { AppScript } from '../app.script';
import { RevByMonthChartService } from '../rev-by-month-chart.service';
import { ByProductChartService } from '../by-product-chart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(public productFilter: ProductFilterService, private config: AppConfig, private timeService: TimeSelectService, public areaService: AreaFilterService, public topGameService: TopGameChartService, private areaFilter: AreaFilterService, private categoryFilter: CategoryFilterService, private deptFilter: DeptFilterService, private gametypeFilter: GametypeFilterService, private revbyMonthService: RevByMonthChartService, private byProductService: ByProductChartService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.productFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/product?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate));
  }

  updateChart() {
    this.byProductService.setHidden(true, false, true);
    let time_select = this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate);
    this.byProductService.loadByProduct(this.config.getConfig("apiRootUrl"), this.timeService.unit, time_select, AppScript.buildFilter("", "", "", "", this.productFilter.value), "by-product-chart");
    // this.revbyMonthService.setHidden(true, false, true);

    // this.categoryFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/category?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, "", this.deptFilter.value, this.gametypeFilter.value, this.productFilter.value));
    // this.deptFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/dept?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, "", this.gametypeFilter.value, this.productFilter.value));
    // this.gametypeFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/gametype?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, "", this.productFilter.value));
    // this.areaFilter.getFilterList(this.config.getConfig("apiRootUrl") + "directory/area?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter("", this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, this.productFilter.value));

    // this.revbyMonthService.loadRevByMonth(this.config.getConfig("apiRootUrl") + "metrics/revenue/?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, this.productFilter.value), this.timeService.buildTimeSelectParam(this.config.getConfig("startTime"), this.timeService.toDate), "rev-by-month-chart");

  }

}
