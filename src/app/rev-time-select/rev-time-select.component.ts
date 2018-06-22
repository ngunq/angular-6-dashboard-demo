import { Component, OnInit } from '@angular/core';
import { TimeSelectService } from "../time-select.service";
import { AreaPuChartService } from '../area-pu-chart.service';
import { CategoryPuChartService } from '../category-pu-chart.service';
import { DeptPuChartService } from '../dept-pu-chart.service';
import { GametypePuChartService } from '../gametype-pu-chart.service';
import { AreaChartService } from "../area-chart.service";
import { CategoryChartService } from "../category-chart.service";
import { DeptChartService } from "../dept-chart.service";
import { GametypeChartService } from "../gametype-chart.service";
import { AppConfig } from "../app.config";
import { AppScript } from '../app.script';
import { RevTimeSelectService } from '../rev-time-select.service';

@Component({
  selector: 'app-rev-time-select',
  templateUrl: './rev-time-select.component.html',
  styleUrls: ['./rev-time-select.component.css']
})
export class RevTimeSelectComponent implements OnInit {


  constructor(public timeService: TimeSelectService, public config: AppConfig, private areaChartService: AreaChartService, private categoryChartService: CategoryChartService, private deptChartService: DeptChartService, private gametypeChartService: GametypeChartService, private areaPuService: AreaPuChartService, private catePuService: CategoryPuChartService, private deptPuService: DeptPuChartService, private gametypePuService: GametypePuChartService, public revTimeService: RevTimeSelectService) { }

  ngOnInit() {
    this.revTimeService.init();
  }


  updateChart() {
    let rootUrl = this.config.getConfig("apiRootUrl");
    // let timeSelect = this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate);

    this.areaChartService.setHidden(true, false, true);
    this.categoryChartService.setHidden(true, false, true);
    this.deptChartService.setHidden(true, false, true);
    this.gametypeChartService.setHidden(true, false, true);
    this.areaPuService.setHidden(true, false, true);
    this.catePuService.setHidden(true, false, true);
    this.deptPuService.setHidden(true, false, true);
    this.gametypePuService.setHidden(true, false, true);

    this.areaChartService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaChartService, this.categoryChartService, this.deptChartService, this.gametypeChartService, "area-chart");
    this.categoryChartService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaChartService, this.categoryChartService, this.deptChartService, this.gametypeChartService, "category-chart");
    this.deptChartService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaChartService, this.categoryChartService, this.deptChartService, this.gametypeChartService, "dept-chart");
    this.gametypeChartService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaChartService, this.categoryChartService, this.deptChartService, this.gametypeChartService, "gametype-chart");
    this.areaPuService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaPuService, this.catePuService, this.deptPuService, this.gametypePuService, "area-pu-chart");
    this.catePuService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaPuService, this.catePuService, this.deptPuService, this.gametypePuService, "category-pu-chart");
    this.deptPuService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaPuService, this.catePuService, this.deptPuService, this.gametypePuService, "dept-pu-chart");
    this.gametypePuService.loadStaticChart(rootUrl, this.timeService.unit, this.revTimeService.revTimeValue, AppScript.buildFilter("", "", "", "", ""), this.areaPuService, this.catePuService, this.deptPuService, this.gametypePuService, "gametype-pu-chart");

  }

}
