import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { TimeSelectService } from "../time-select.service";
import { AppConfig } from "../app.config";
import { GrossRevService } from "../gross-rev.service";
import { VsLastTimeService } from "../vs-last-time.service";
import { AreaChartService } from "../area-chart.service";
import { CategoryChartService } from "../category-chart.service";
import { DeptChartService } from "../dept-chart.service";
import { GametypeChartService } from "../gametype-chart.service";
import { TopGameChartService } from "../top-game-chart.service";
import { AreaFilterService } from "../area-filter.service";
import { CategoryFilterService } from "../category-filter.service";
import { DeptFilterService } from "../dept-filter.service";
import { GametypeFilterService } from "../gametype-filter.service";
import { ProductFilterService } from "../product-filter.service";
import { RevByMonthChartService } from '../rev-by-month-chart.service';
import { AreaPuChartService } from '../area-pu-chart.service';

// import { AppScript } from '../app.script';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.css']
})
export class TimeSelectComponent implements OnInit {

  constructor(private eRef: ElementRef, public timeService: TimeSelectService, public config: AppConfig, private grossRevService: GrossRevService, private vsLastTimeService: VsLastTimeService, private areaChartService: AreaChartService, private categoryChartService: CategoryChartService, private deptChartService: DeptChartService, private gametypeChartService: GametypeChartService, private topGameChartService: TopGameChartService, private areaFilterService: AreaFilterService, private categoryFilterService: CategoryFilterService, private deptFilterService: DeptFilterService, private gametypeFilterService: GametypeFilterService, private productFilterService: ProductFilterService, private revbyMonthService: RevByMonthChartService) { }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target) && event.target.id !== "toggle-time-select" && !this.isClickOut(event.path)) {
      this.timeService.panelHidden = true;
    }
  }

  isClickOut(path: any) {
    for (let i = 0; i < path.length; i++) {
      if (path[i].nodeName === "APP-TIME-SELECT")
        return true;
    }
    return false;
  }
  ngOnInit() {
    this.timeService.init();
    this.timeService.unitList = this.config.getConfig("timeUnits");
    this.timeService.unit = this.config.getConfig("defaultTimeUnit");
  }

  toggleTimeSelect() {
    this.timeService.toggleTimeSelect();
  }

  toggleCalendar(index: number) {
    this.timeService.toggleCalendar(index);
  }

  apply() {
    // this.timeService.apply(this.config.getConfig("apiRootUrl"), this.areaChartService, this.categoryChartService, this.deptChartService, this.gametypeChartService, this.grossRevService, this.vsLastTimeService, this.topGameChartService, this.revbyMonthService, this.areaFilterService, this.categoryFilterService, this.deptFilterService, this.gametypeFilterService, this.productFilterService);
  }

}
