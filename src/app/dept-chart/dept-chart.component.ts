import { Component, OnInit } from '@angular/core';
import { DeptChartService } from '../dept-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AppScript } from '../app.script';
import { CategoryChartService } from '../category-chart.service';
import { AreaChartService } from '../area-chart.service';
import { GametypeChartService } from '../gametype-chart.service';

@Component({
  selector: 'app-dept-chart',
  templateUrl: './dept-chart.component.html',
  styleUrls: ['./dept-chart.component.css']
})
export class DeptChartComponent implements OnInit {

  constructor(public chartService: DeptChartService, private config: AppConfig, private timeService: TimeSelectService, public categoryService: CategoryChartService, public areaService: AreaChartService, public gametypeService: GametypeChartService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load(){
    this.chartService.setHidden(true, false, true);
    this.chartService.loadStaticChart(this.config.getConfig("apiRootUrl"), this.timeService.unit, this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate).toString(), AppScript.buildFilter("", "", "", "", ""),this.areaService, this.categoryService, this.chartService, this.gametypeService, "dept-chart");
  }
}
