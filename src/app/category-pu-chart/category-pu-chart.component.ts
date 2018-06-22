import { Component, OnInit } from '@angular/core';
import { AreaPuChartService } from '../area-pu-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AppScript } from '../app.script';
import { CategoryPuChartService } from '../category-pu-chart.service';
import { DeptPuChartService } from '../dept-pu-chart.service';
import { GametypePuChartService } from '../gametype-pu-chart.service';

@Component({
  selector: 'app-category-pu-chart',
  templateUrl: './category-pu-chart.component.html',
  styleUrls: ['./category-pu-chart.component.css']
})
export class CategoryPuChartComponent implements OnInit {

  constructor(public chartService: CategoryPuChartService, private config: AppConfig, private timeService: TimeSelectService, public areaService: AreaPuChartService, public deptService: DeptPuChartService, public gametypeService: GametypePuChartService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load()
  }

  load() {
    this.chartService.setHidden(true, false, true);
    this.chartService.loadStaticChart(this.config.getConfig("apiRootUrl"), this.timeService.unit, this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate).toString(), AppScript.buildFilter("", "", "", "", ""), this.areaService, this.chartService, this.deptService, this.gametypeService, "category-pu-chart");
  }
}
