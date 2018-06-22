import { Component, OnInit } from '@angular/core';
import { GametypeChartService } from '../gametype-chart.service';
import { AppConfig } from "../app.config";
import { TimeSelectService } from "../time-select.service";
import { AppScript } from '../app.script';
import { AreaChartService } from '../area-chart.service';
import { DeptChartService } from '../dept-chart.service';
import { CategoryChartService } from '../category-chart.service';

@Component({
  selector: 'app-gametype-chart',
  templateUrl: './gametype-chart.component.html',
  styleUrls: ['./gametype-chart.component.css']
})
export class GametypeChartComponent implements OnInit {

  constructor(public chartService: GametypeChartService, private config: AppConfig, private timeService: TimeSelectService, public areaService: AreaChartService, public deptService: DeptChartService, public cateService: CategoryChartService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load(){
    this.chartService.setHidden(true, false, true);
    this.chartService.loadStaticChart(this.config.getConfig("apiRootUrl"), this.timeService.unit, this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate).toString(), AppScript.buildFilter("", "", "", "", ""), this.areaService, this.cateService, this.deptService, this.chartService, "gametype-chart");
  }
}
