import { Component, OnInit } from '@angular/core';
import { TopGameChartService } from '../top-game-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AreaFilterService } from "../area-filter.service";
import { CategoryFilterService } from "../category-filter.service";
import { GametypeFilterService } from "../gametype-filter.service";
import { DeptFilterService } from "../dept-filter.service";
import { ProductFilterService } from "../product-filter.service";
import { AppScript } from '../app.script';

@Component({
  selector: 'app-top-game-chart',
  templateUrl: './top-game-chart.component.html',
  styleUrls: ['./top-game-chart.component.css']
})
export class TopGameChartComponent implements OnInit {

  constructor(public chartService: TopGameChartService, private config: AppConfig, public timeService: TimeSelectService, private areaFilter: AreaFilterService, private categoryFilter: CategoryFilterService, private deptFilter: DeptFilterService, private gametypeFilter: GametypeFilterService, private productFilter: ProductFilterService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load() {
    this.chartService.setHidden(true, false, true);
    this.chartService.loadTopGame(this.config.getConfig("apiRootUrl") + "metrics/revenue/topN?time_unit=" + this.timeService.unit + "&time_select=" + this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate) + AppScript.buildFilter(this.areaFilter.value, this.categoryFilter.value, this.deptFilter.value, this.gametypeFilter.value, this.productFilter.value), "top-game-chart");
  }
}
