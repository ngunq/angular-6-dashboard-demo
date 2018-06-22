import { Component, OnInit } from '@angular/core';
import { TimeSelectService } from '../time-select.service';
import { AppConfig } from "../app.config";
import { GrossRevService } from "../gross-rev.service";
import { VsLastTimeService } from "../vs-last-time.service";
import { AreaChartService } from "../area-chart.service";
import { CategoryChartService } from "../category-chart.service";
import { DeptChartService } from "../dept-chart.service";
import { GametypeChartService } from "../gametype-chart.service";
import { TopGameChartService } from "../top-game-chart.service";
import { RevByMonthChartService } from "../rev-by-month-chart.service";
import { AreaFilterService } from "../area-filter.service";
import { CategoryFilterService } from "../category-filter.service";
import { DeptFilterService } from "../dept-filter.service";
import { GametypeFilterService } from "../gametype-filter.service";
import { ProductFilterService } from "../product-filter.service";
import { PuChartService } from '../pu-chart.service';
import { ArppuChartService } from '../arppu-chart.service';
import { AreaPuChartService } from '../area-pu-chart.service';
import { CategoryPuChartService } from '../category-pu-chart.service';
import { DeptPuChartService } from '../dept-pu-chart.service';
import { GametypePuChartService } from '../gametype-pu-chart.service';
import { ByProductChartService } from '../by-product-chart.service';
import { AppScript } from '../app.script';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  controllerHidden = true;
  constructor(public timeService: TimeSelectService, public config: AppConfig, private grossRevService: GrossRevService, private vsLastTimeService: VsLastTimeService, private areaChartService: AreaChartService, private categoryChartService: CategoryChartService, private deptChartService: DeptChartService, private gametypeChartService: GametypeChartService, private topGameChartService: TopGameChartService, private revByMonthChartService: RevByMonthChartService, private areaFilterService: AreaFilterService, private categoryFilterService: CategoryFilterService, private deptFilterService: DeptFilterService, private gametypeFilterService: GametypeFilterService, private productFilterService: ProductFilterService, private puService: PuChartService, private arppuService: ArppuChartService, private areaPuService: AreaPuChartService, private catePuService: CategoryPuChartService, private deptPuService: DeptPuChartService, private gametypePuService: GametypePuChartService, private byProductService: ByProductChartService) { }

  ngOnInit() {
  }

  mouseEnter() {
    this.controllerHidden = false;
  }

  mouseLeave() {
    this.controllerHidden = true;
  }

  // previous() {
  //   this.timeService.previous();
  //   this.timeService.apply(this.config.getConfig("apiRootUrl"), this.areaChartService, this.categoryChartService, this.deptChartService, this.gametypeChartService, this.grossRevService, this.vsLastTimeService, this.topGameChartService, this.revByMonthChartService, this.areaFilterService, this.categoryFilterService, this.deptFilterService, this.gametypeFilterService, this.productFilterService, this.puService, this.arppuService, this.areaPuService, this.catePuService, this.deptPuService, this.gametypePuService, this.byProductService);

  // }

  // next() {
  //   this.timeService.next();
  //   this.timeService.apply(this.config.getConfig("apiRootUrl"), this.areaChartService, this.categoryChartService, this.deptChartService, this.gametypeChartService, this.grossRevService, this.vsLastTimeService, this.topGameChartService, this.revByMonthChartService, this.areaFilterService, this.categoryFilterService, this.deptFilterService, this.gametypeFilterService, this.productFilterService, this.puService, this.arppuService, this.areaPuService, this.catePuService, this.deptPuService, this.gametypePuService, this.byProductService);

  // }

}
