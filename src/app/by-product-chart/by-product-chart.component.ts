import { Component, OnInit } from '@angular/core';
import { ByProductChartService } from '../by-product-chart.service';
import { TimeSelectService } from "../time-select.service";
import { ProductFilterService } from "../product-filter.service";
import { AppConfig } from "../app.config";
import { AppScript } from '../app.script';


@Component({
  selector: 'app-by-product-chart',
  templateUrl: './by-product-chart.component.html',
  styleUrls: ['./by-product-chart.component.css']
})
export class ByProductChartComponent implements OnInit {

  constructor(public chartService: ByProductChartService, private timeService: TimeSelectService, private config: AppConfig, private productService: ProductFilterService) { }

  ngOnInit() {
    this.chartService.setOptions();
    this.load();
  }

  load() {
    this.chartService.setHidden(true, false, true);
    let time_select = this.timeService.buildTimeSelectParam("2017-01-01", this.timeService.toDate);
    this.chartService.loadByProduct(this.config.getConfig("apiRootUrl"), this.timeService.unit, time_select, AppScript.buildFilter("", "", "", "", this.productService.value), "by-product-chart");
  }

}
