import { Component, OnInit } from '@angular/core';
import { CategoryChartService } from '../category-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AppScript } from '../app.script';
import { AreaChartService } from '../area-chart.service';
import { DeptChartService } from '../dept-chart.service';
import { GametypeChartService } from '../gametype-chart.service';

@Component({
  selector: 'app-category-chart',
  templateUrl: './category-chart.component.html',
  styleUrls: ['./category-chart.component.css']
})
export class CategoryChartComponent implements OnInit {

  constructor(public chartService: CategoryChartService, private config: AppConfig, private timeService: TimeSelectService, public areaService: AreaChartService, public deptService: DeptChartService, public gametypeService: GametypeChartService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load(){
    this.chartService.setHidden(true, false, true);
    this.chartService.loadStaticChart(this.config.getConfig("apiRootUrl"), this.timeService.unit, this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate).toString(), AppScript.buildFilter("", "", "", "", ""), this.areaService, this.chartService, this.deptService, this.gametypeService, "category-chart");
  }

}
