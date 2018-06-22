import { Component, OnInit } from '@angular/core';
import { AreaChartService } from '../area-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AppScript } from '../app.script';
import { CategoryChartService } from '../category-chart.service';
import { DeptChartService } from '../dept-chart.service';
import { GametypeChartService } from '../gametype-chart.service';


@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {

  constructor(public chartService: AreaChartService, private config: AppConfig, private timeService: TimeSelectService, public categoryService: CategoryChartService, public deptService: DeptChartService, public gametypeService: GametypeChartService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load() {
    this.chartService.setHidden(true, false, true);
    this.chartService.loadStaticChart(this.config.getConfig("apiRootUrl"), this.timeService.unit, this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate).toString(), AppScript.buildFilter("", "", "", "", ""), this.chartService, this.categoryService, this.deptService, this.gametypeService, "area-chart");
  }
}
