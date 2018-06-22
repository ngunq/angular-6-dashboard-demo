import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AppScript } from './app.script';
import { GroupedObservable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeSelectService {
  nums = ["Một", "Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười", "Mười Một", "Mười Hai"];
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  quarter = ["I", "II", "III", "IV"];
  full_months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  panelHidden: boolean = true;
  calendarHidden: boolean[] = [true, true];

  fromDate: string = "";
  toDate: string = "";

  fromCalendarModel: Object = {};
  toCalendarModel: Object = {};

  timeLabel = "Last month";
  unit: any = "";
  unitList = [];

  // revTimeSelect = this.getRevTimeSelect();

  constructor() { }

  init() {
    let from = moment().subtract(1, "months").startOf("month");
    let to = moment().subtract(1, "months").endOf("month");

    this.fromDate = from.format("YYYY-MM-DD");
    this.toDate = to.format("YYYY-MM-DD");

    this.fromCalendarModel["year"] = parseInt(from.format("YYYY"));
    this.fromCalendarModel["month"] = parseInt(from.format("M"));
    this.fromCalendarModel["day"] = parseInt(from.format("D"));
    this.toCalendarModel["year"] = parseInt(to.format("YYYY"));
    this.toCalendarModel["month"] = parseInt(to.format("M"));
    this.toCalendarModel["day"] = parseInt(to.format("D"));
  }

  toggleTimeSelect() {
    this.panelHidden = !this.panelHidden;
  }

  toggleCalendar(index: number) {
    let other = index + 1 == 2 ? 0 : index + 1;
    this.calendarHidden[index] = !this.calendarHidden[index];
    this.calendarHidden[other] = true;
  }

  buildTimeSelectParam(f: string, t: string) {
    let from = moment(f);
    let to = moment(t);
    let unit: any = this.unit + "s";
    let diff = to.diff(from, unit);
    let format = "";
    switch (this.unit) {
      case "month":
        format = "YYYYMM";
        break;

      case "year":
        format = "YYYY";
        break;

      case "quarter":
        format = "YYYYQ";
        break;
    }

    // if (diff === 0) diff = 1;
    let param = [];
    let tmp = from.add(0, unit).format(format);
    if (this.unit === "quarter") {
      tmp = tmp.substring(0, 4) + "Q" + tmp.substring(4);
    }
    console.log(tmp);

    param.push(tmp);
    for (let i = 0; i < diff; i++) {
      tmp = from.add(1, unit).format(format);
      if (this.unit === "quarter") {
        tmp = tmp.substring(0, 4) + "Q" + tmp.substring(4);
      }
      param.push(tmp);
    }
    return param;
  }

  quickRange(normal: boolean, f: any, t: any, unit: string, label: string) {
    // console.log(label);
    this.unit = unit.split('s')[0];
    this.timeLabel = label;
    let from: any;
    let to: any;
    if (!normal) {
      let tmp: any = unit.split('s')[0];
      let s: any = moment().startOf("day").diff(moment().subtract(t, unit).startOf(tmp), 'days');
      let e: any = moment().endOf('day').diff(moment().subtract(t, unit).endOf(tmp), 'days');
      switch (f) {
        case 0:
          s--;
          e--;
          break;
        case 1:
          s--;
          e = 0;
        default:
          break;
      }
      from = moment().subtract(s, "days");
      to = moment().subtract(e, "days");

    } else {
      from = moment().subtract(f, unit);
      to = moment().subtract(t, unit);
    }
    this.fromDate = from.format("YYYY-MM-DD");
    this.toDate = to.format("YYYY-MM-DD");
    this.fromCalendarModel["year"] = parseInt(from.format("YYYY"));
    this.fromCalendarModel["month"] = parseInt(from.format("M"));
    this.fromCalendarModel["day"] = parseInt(from.format("D"));
    this.toCalendarModel["year"] = parseInt(to.format("YYYY"));
    this.toCalendarModel["month"] = parseInt(to.format("M"));
    this.toCalendarModel["day"] = parseInt(to.format("D"));

  }

  getUnitText() {
    let result = "";
    switch (this.unit) {
      case "month":
        result += "Monthly";

        break;

      case "quarter":
        result += "Quarterly";
        break;

      case "year":
        result += "Yearly";
        break;
    }
    return result;
  }

  getNum() {
    let result = "";
    let time = moment(this.fromDate);
    switch (this.unit) {

      case "month":
        result = this.nums[(parseInt(time.format("M")) - 1)];

        break;

      case "quarter":
        result = this.nums[(parseInt(time.format("Q")) - 1)];
        break;

    }
    return " " + result;
  }

  getGrossTitle() {
    let time = moment(this.fromDate);
    switch (this.unit) {
      case "month":
        return "T" + time.format("M");

      case "quarter":
        return "Q" + time.format("Q");
    }
  }

  getMonth() {
    return this.months[parseInt(moment(this.fromDate).format("M")) - 1];
  }

  getTitle() {
    switch (this.unit) {
      case "month":
        return "Tháng " + moment(this.fromDate).format("M");

      case "quarter":
        return "Quý " + moment(this.fromDate).format("Q");
    }
  }

  getUpdated() {
    return moment().subtract(1, "months").endOf("month").format("YYYY/MM/DD");
  }

  getYear() {
    return moment(this.fromDate).format("YYYY");
  }

  getRevTimeSelect(startTime: string) {
    let result = [];
    let unit: any = this.unit + "s";
    let from = moment(startTime);
    let to = moment().endOf(this.unit);
    let diff = to.diff(from, unit);
    let format = "";
    switch (this.unit) {
      case "month":
        format = "YYYYMM";
        break;

      case "quarter":
        format = "YYYYQ";
        break;
    }

    // if (diff === 0) diff = 1;
    let tmp = {};
    let val = from.add(0, unit).format(format);
    let label = "";
    if (this.unit === "quarter") {
      val = val.substring(0, 4) + "Q" + val.substring(4);
    }
    label = val.substring(0, 4) + "/" + val.substring(4);

    tmp["value"] = val;
    tmp["label"] = label;
    // console.log(tmp);
    result.push(tmp);
    for (let i = 0; i < diff; i++) {
      tmp = {};
      val = from.add(1, unit).format(format);
      if (this.unit === "quarter") {
        val = val.substring(0, 4) + "Q" + val.substring(4);
      }
      label = val.substring(0, 4) + "/" + val.substring(4);

      tmp["value"] = val;
      tmp["label"] = label;
      // console.log(tmp);

      result.push(tmp);
    }
    return result;
  }


  previous() {
    let unit: any = this.unit + "s";

    let from = moment(this.fromDate).subtract(1, unit);
    let to = moment(this.toDate).subtract(1, unit);

    this.fromDate = from.format("YYYY-MM-DD");
    this.toDate = to.format("YYYY-MM-DD");

    this.fromCalendarModel["year"] = parseInt(from.format("YYYY"));
    this.fromCalendarModel["month"] = parseInt(from.format("M"));
    this.fromCalendarModel["day"] = parseInt(from.format("D"));
    this.toCalendarModel["year"] = parseInt(to.format("YYYY"));
    this.toCalendarModel["month"] = parseInt(to.format("M"));
    this.toCalendarModel["day"] = parseInt(to.format("D"));
  }

  next() {
    let unit: any = this.unit + "s";

    let from = moment(this.fromDate).add(1, unit);
    let to = moment(this.toDate).add(1, unit);

    this.fromDate = from.format("YYYY-MM-DD");
    this.toDate = to.format("YYYY-MM-DD");

    this.fromCalendarModel["year"] = parseInt(from.format("YYYY"));
    this.fromCalendarModel["month"] = parseInt(from.format("M"));
    this.fromCalendarModel["day"] = parseInt(from.format("D"));
    this.toCalendarModel["year"] = parseInt(to.format("YYYY"));
    this.toCalendarModel["month"] = parseInt(to.format("M"));
    this.toCalendarModel["day"] = parseInt(to.format("D"));
  }

  apply(rootUrl: string, startTime: string, areaChartService: any, categoryChartService: any, deptChartService: any, gametypeChartService: any, grossRevService: any, vsLastTimeService: any, topGameChartService: any, revbyMonthService: any, areaFilterService: any, categoryFilterService: any, deptFilterService: any, gametypeFilterService: any, productFilterService: any, puService: any, arppuService: any, areaPuService: any, catePuService: any, deptPuService: any, gametypePuService: any, byProductService: any) {
    this.panelHidden = true;
    let timeSelect = this.buildTimeSelectParam(this.fromDate, this.toDate);

    grossRevService.setHidden(true, false, true);
    vsLastTimeService.setHidden(true, false, true);
    areaChartService.setHidden(true, false, true);
    categoryChartService.setHidden(true, false, true);
    deptChartService.setHidden(true, false, true);
    gametypeChartService.setHidden(true, false, true);
    topGameChartService.setHidden(true, false, true);
    revbyMonthService.setHidden(true, false, true);
    puService.setHidden(true, false, true);
    arppuService.setHidden(true, false, true);
    areaPuService.setHidden(true, false, true);
    catePuService.setHidden(true, false, true);
    deptPuService.setHidden(true, false, true);
    gametypePuService.setHidden(true, false, true);
    byProductService.setHidden(true, false, true);

    grossRevService.getGrossRev(rootUrl + "metrics/revenue/total?time_unit=" + this.unit + "&time_select=" + timeSelect);
    vsLastTimeService.getPercent(rootUrl + "metrics/revenue/ctlm?time_unit=" + this.unit + "&time_select=" + timeSelect);
    areaChartService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaChartService, categoryChartService, deptChartService, gametypeChartService, "area-chart");
    categoryChartService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaChartService, categoryChartService, deptChartService, gametypeChartService, "category-chart");
    deptChartService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaChartService, categoryChartService, deptChartService, gametypeChartService, "dept-chart");
    gametypeChartService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaChartService, categoryChartService, deptChartService, gametypeChartService, "gametype-chart");
    topGameChartService.loadTopGame(rootUrl + "metrics/revenue/topN?time_unit=" + this.unit + "&time_select=" + timeSelect + AppScript.buildFilter(areaFilterService.value, categoryFilterService.value, deptFilterService.value, gametypeFilterService.value, ""), "top-game-chart");
    revbyMonthService.loadRevByMonth(rootUrl + "metrics/revenue/?time_unit=" + this.unit + "&time_select=" + this.buildTimeSelectParam(startTime, this.toDate) + AppScript.buildFilter(areaFilterService.value, categoryFilterService.value, deptFilterService.value, gametypeFilterService.value, ""), this.buildTimeSelectParam(startTime, this.toDate), "rev-by-month-chart");
    puService.loadPu(rootUrl + "metrics/pu/?time_unit=" + this.unit + "&time_select=" + this.buildTimeSelectParam(startTime, this.toDate) + AppScript.buildFilter(areaFilterService.value, categoryFilterService.value, deptFilterService.value, gametypeFilterService.value, ""), this.buildTimeSelectParam(startTime, this.toDate), "pu-chart");
    arppuService.loadPu(rootUrl + "metrics/arppu/?time_unit=" + this.unit + "&time_select=" + this.buildTimeSelectParam(startTime, this.toDate) + AppScript.buildFilter(areaFilterService.value, categoryFilterService.value, deptFilterService.value, gametypeFilterService.value, ""), this.buildTimeSelectParam(startTime, this.toDate), "arppu-chart");
    areaPuService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaPuService, catePuService, deptPuService, gametypePuService, "area-pu-chart");
    catePuService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaPuService, catePuService, deptPuService, gametypePuService, "category-pu-chart");
    deptPuService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaPuService, catePuService, deptPuService, gametypePuService, "dept-pu-chart");
    gametypePuService.loadStaticChart(rootUrl, this.unit, timeSelect.toString(), AppScript.buildFilter("", "", "", "", ""), areaPuService, catePuService, deptPuService, gametypePuService, "gametype-pu-chart");
    byProductService.loadByProduct(rootUrl, this.unit, this.buildTimeSelectParam(startTime, this.toDate), AppScript.buildFilter("", "", "", "", productFilterService.value), "by-product-chart");


    areaFilterService.getFilterList(rootUrl + "directory/area?time_unit=" + this.unit + "&time_select=" + timeSelect);
    categoryFilterService.getFilterList(rootUrl + "directory/category?time_unit=" + this.unit + "&time_select=" + timeSelect);
    deptFilterService.getFilterList(rootUrl + "directory/dept?time_unit=" + this.unit + "&time_select=" + timeSelect);
    gametypeFilterService.getFilterList(rootUrl + "directory/gametype?time_unit=" + this.unit + "&time_select=" + timeSelect);
    productFilterService.getFilterList(rootUrl + "directory/product?time_unit=" + this.unit + "&time_select=" + timeSelect);
  }

  setTime(unit: any, rootUrl: string, startTime: string, areaChartService: any, categoryChartService: any, deptChartService: any, gametypeChartService: any, grossRevService: any, vsLastTimeService: any, topGameChartService: any, revbyMonthService: any, areaFilterService: any, categoryFilterService: any, deptFilterService: any, gametypeFilterService: any, productFilterService: any, puService: any, arppuService: any, areaPuService: any, catePuService: any, deptPuService: any, gametypePuService: any, byProductService: any, revTimeService: any) {
    this.unit = unit.split("s")[0];
    let from = moment().subtract(1, 'months');
    let to = moment().subtract(1, 'months');

    this.fromDate = from.startOf(unit).format("YYYY-MM-DD");
    this.toDate = to.endOf(unit).format("YYYY-MM-DD");

    revTimeService.init();

    this.apply(rootUrl, startTime, areaChartService, categoryChartService, deptChartService, gametypeChartService, grossRevService, vsLastTimeService, topGameChartService, revbyMonthService, areaFilterService, categoryFilterService, deptFilterService, gametypeFilterService, productFilterService, puService, arppuService, areaPuService, catePuService, deptPuService, gametypePuService, byProductService);
  }
}
