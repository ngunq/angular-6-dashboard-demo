import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSelectService } from "./time-select.service";
// import { AreaChartService } from './area-chart.service';
// import { CategoryChartService } from './category-chart.service';
// import { DeptChartService } from './dept-chart.service';

import * as Highcharts from 'highcharts';
// import * as exporting from 'highcharts/modules/exporting.src';
// import * as csv from 'highcharts/modules/export-data.src';
import { AppScript } from './app.script';

// exporting(Highcharts);
// csv(Highcharts);


@Injectable({
  providedIn: 'root'
})
export class GametypeChartService {
  hidden: boolean = true;
  loader: boolean = false;
  reload: boolean = true;

  private chartOptions: Object = {
    "colors": [

      "#3b5998",
      "#fabc05",
      "#e15759",
      "#9c755f",
      "#012935",
      "#7cb5ec",
      "#90ed7d",
      "#434348",
      "#f7a35c",
      "#8085e9",
      "#f15c80",
      "#e4d354",
      "#2b908f",
      "#f45b5b",
      "#91e8e1"

    ],
    "chart": {
      "backgroundColor": null,
      "style": {
        "fontFamily": "Roboto, Dosis, Source Sans Pro, sans-serif"
      }
    },
    "title": {
      "style": {
        "color": "black",
        "fontSize": "16px",
        // "fontWeight": "bold"
      }
    },
    "subtitle": {
      "style": {
        "color": "black"
      }
    },
    "tooltip": {
      "borderWidth": 0

    },
    "legend": {
      "itemStyle": {
        "fontWeight": "bold",
        "fontSize": "13px"
      }
    },
    "xAxis": {
      "labels": {
        "style": {
          "color": "#6e6e70"
        }
      }
    },
    "yAxis": {
      "gridLineWidth": 0,
      "labels": {
        "style": {
          "color": "#6e6e70"
        }
      }
    },
    "plotOptions": {
      "line": {
        "marker": {
          "enabled": true,
          "symbol": 'circle',
          "radius": 2
        },
        "dataLabels": {
          "enabled": true,
          "formatter": function () {
            return Highcharts.numberFormat(this.y / 1000000000, 1, '.', ',') + ' tỷ';
          }
        }
      },
      "column": {
        "dataLabels": {
          "enabled": true,
          "formatter": function () {
            return Highcharts.numberFormat(this.y / 1000000000, 1, '.', ',') + ' tỷ';
          }
        }
      }
    },
    "credits": {
      "enabled": false
    },
    "lang": {
      "decimalPoint": ".",
      "thousandsSep": ","
    }
  };

  setOptions() {
    Highcharts.createElement('link', {
      href: 'assets/css/font.css',
      rel: 'stylesheet',
      type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);
    Highcharts.setOptions(this.chartOptions);
  }
  constructor(private http: HttpClient, private timeService: TimeSelectService) { }

  drawChart(id: string, name: string, categories: any, data: any, tt: any, rootUrl: string, timeUnit: string, timeSelect: string, areaService: any, categoryService: any, deptService: any, gametypeService: any) {
    let option = {
      "chart": {
        "type": "column"
      },
      "title": {
        "text": ""
      },
      "exporting": {
        "filename": id,
        "buttons": {
          "contextButton": {
            "y": -10
          }
        }
      },
      "xAxis": {
        "categories": categories,
        "right": 0
      },
      "yAxis": {
        "min": 0,
        "title": {
          "text": ""
        },
        "labels": {
          "formatter": function () {
            return this.value / 1000000000 + ' tỷ';
          }
        },
      },
      "legend": {
        "enabled": false
        // "verticalAlign": "top",
        // "floating": true,
        // "backgroundColor": "white",
        // "borderColor": "#FFF",
        // "borderWidth": 1,
        // "shadow": false
      },
      "tooltip": {
        "useHTML": true,
        "padding": 5,
        "backgroundColor": "rgba(0,0,0,0.8)",
        "style": {
          "color": "#fff",
        },
        "formatter": function () {
          let x = this.x;
          let y = this.y;
          let data = this.series.data;
          let unit = "";
          switch (timeUnit) {
            case "month":
              unit = "Tháng";
              break;

            case "quarter":
              unit = "Quý";
              break;

            case "year":
              unit = "Năm";
              break;
          }
          let toolTipTemplate = ["Khu vực", "Doanh thu", "So " + unit.toLowerCase() + " trước", unit + " báo cáo"];
          let withLastMonth: any = null;
          let diff = 0;
          for (let i = 0; i < data.length; i++) {
            if (data[i].category === x) {
              if (i === 0) {
                diff = y;
                withLastMonth = "Vô hạn";
              } else {
                diff = y - data[i - 1].y;
                withLastMonth = diff / data[i - 1].y * 100;
              }
              break;
            }
          }
          let tooltipValue = [x, Highcharts.numberFormat(y, 0, '.', ','), tt[x] + "%", timeSelect];
          let tooltip = "<div style = \"width: 210px;\">";
          for (let i = 0; i < toolTipTemplate.length; i++) {
            tooltip += "<div class=\"row mb5\">" +
              "<div class=\"col-md-6 col-xs-6 col-sm-6 text-right\" style=\"color: #999;\">" +
              toolTipTemplate[i] +
              "</div>" +
              "<div class=\"col-md-6 col-xs-6 col-sm-6 text-left\"><strong>" +
              tooltipValue[i] +
              "</strong></div>" +
              "</div>";
          }
          tooltip += "</div>";

          return tooltip;

        }
      },
      "plotOptions": {

        "series": {
          "cursor": "pointer",
          "events": {
            // click: this.onClickChartPoint
            click: function (e) {

              console.log(e.point);
              console.log(this.chart.series);
              let series = this.chart.series;
              let category = e.point.category;
              let color = e.point.color;
              let gametype = "";

              for (let i = 0; i < series.length; i++) {
                let themeColor = Highcharts.getOptions().colors[i];
                let rgb = AppScript.hexToRgb(themeColor);
                let sData = series[i].data;

                for (let j = 0; j < sData.length; j++) {
                  let dCate = sData[j].category;
                  let dColor = sData[j].color;

                  if (dCate !== category) {
                    if (dColor.startsWith("rgba") && color.startsWith("#")) {
                      sData[j].color = themeColor;
                      gametype = "";
                      gametypeService.setHidden(true, false, true);
                      gametypeService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "gametype-chart");
                    } else {
                      sData[j].color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.3)';
                      //reload
                      gametype = category;
                    }
                  } else {
                    sData[j].color = themeColor;
                  }
                }
                series[i].update({ data: sData }, true, false);
                gametype.replace(" ", "%20");

                areaService.setHidden(true, false, true);
                categoryService.setHidden(true, false, true);
                deptService.setHidden(true, false, true);

                categoryService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "category-chart");
                deptService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "dept-chart");
                areaService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "area-chart");
              }
            }
          }
        }
      },
      "series": [
        {
          "name": name,
          "data": data
        }
      ]
    };
    this.setHidden(false, true, true);
    let chart = Highcharts.chart(id, option);
    setTimeout(() => {
      if (chart) {

        chart.reflow();

      }
    }, 700);
  }

  drawPieChart(id: string, name: string, data: any, tt: any, rootUrl: string, timeUnit: string, timeSelect: string, areaService: any, categoryService: any, deptService: any, gametypeService: any) {
    let option = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: ''
      },
      tooltip: {
        useHTML: true,
        padding: 5,
        backgroundColor: "rgba(0,0,0,0.8)",
        style: {
          color: "#fff",
        },
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        formatter: function () {
          let x = this.key;
          let y = this.y;
          let data = this.series.data;
          let unit = "";
          switch (timeUnit) {
            case "month":
              unit = "Tháng";
              break;

            case "quarter":
              unit = "Quý";
              break;

            case "year":
              unit = "Năm";
              break;
          }
          let toolTipTemplate = ["Thể loại", "Doanh thu", "So " + unit.toLowerCase() + " trước", unit + " báo cáo"];

          let tooltipValue = [x, Highcharts.numberFormat(y, 0, '.', ','), tt[x] + "%", timeSelect];
          let tooltip = "<div style = \"width: 210px;\">";
          for (let i = 0; i < toolTipTemplate.length; i++) {
            tooltip += "<div class=\"row mb5\">" +
              "<div class=\"col-md-6 col-xs-6 col-sm-6 text-right\" style=\"color: #999;\">" +
              toolTipTemplate[i] +
              "</div>" +
              "<div class=\"col-md-6 col-xs-6 col-sm-6 text-left\"><strong>" +
              tooltipValue[i] +
              "</strong></div>" +
              "</div>";
          }
          tooltip += "</div>";

          return tooltip;

        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        },
        series: {
          events: {
            click: function (e) {
              console.log(e);
              console.log(this);
              let series = this.chart.series[0];
              let pData = series.data;
              let pName = e.point.name;
              let pColor = e.point.color;
              let gametype = "";

              for (let i = 0; i < pData.length; i++) {
                let themeColor = Highcharts.getOptions().colors[i];
                let rgb = AppScript.hexToRgb(themeColor);
                if (pData[i].name !== pName) {
                  if (pData[i].color.startsWith("rgba") && pColor.startsWith("#")) {
                    pData[i].color = themeColor;
                    gametype = "";
                    gametypeService.setHidden(true, false, true);
                    gametypeService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "gametype-chart");
                  } else {
                    pData[i].color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.3)';
                    gametype = pName;
                  }
                } else {
                  pData[i].color = themeColor;
                }
              }
              series.setData(pData, true);
              gametype.replace(" ", "%20");

              areaService.setHidden(true, false, true);
              categoryService.setHidden(true, false, true);
              deptService.setHidden(true, false, true);

              categoryService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "category-chart");
              deptService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "dept-chart");
              areaService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", "", "", gametype, ""), areaService, categoryService, deptService, gametypeService, "area-chart");
            }
          }
        }
      },
      series: [{
        name: 'market-chart',
        colorByPoint: true,
        data: data
      }]
    };
    this.setHidden(false, true, true);
    let chart = Highcharts.chart(id, option);
    setTimeout(() => {
      if (chart) {

        chart.reflow();

      }
    }, 700);
  }

  setHidden(hidden: boolean, loader: boolean, reload: boolean) {
    this.hidden = hidden;
    this.loader = loader;
    this.reload = reload;
  }

  loadStaticChart(rootUrl: string, timeUnit: string, timeSelect: string, filter: string, areaService: any, cateService: any, deptService: any, gametypeService: any, id: string) {
    let url = rootUrl + "metrics/revenue/gametype?time_unit=" + timeUnit + "&time_select=" + timeSelect + filter;
    console.log(url);
    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        console.log(response);
        let name = Object.keys(response)[0];
        // let categories = [];
        let data = [];
        let tooltip = {};

        response[Object.keys(response)[0]].map((e: any) => {
          let keys = Object.keys(e);
          keys.map(k => {
            let tmp = {};
            if (k !== "tooltip") {
              // categories.push(k);
              tmp["name"] = k;
              tmp["y"] = e[k];
              data.push(tmp);
              tooltip[k] = e["tooltip"].toFixed(2);
            }
          });
        });

        // for (let i = 0; i < data.length; i++) {
        //   for (let j = i + 1; j < data.length; j++) {
        //     if (data[i] < data[j]) {
        //       let tmp = data[i];
        //       data[i] = data[j];
        //       data[j] = tmp;
        //       tmp = categories[i];
        //       categories[i] = categories[j];
        //       categories[j] = tmp;
        //     }
        //   }
        // }

        this.drawPieChart(id, "Doanh thu " + name, data, tooltip, rootUrl, timeUnit, timeSelect, areaService, cateService, deptService, gametypeService);
      } else {
        this.setHidden(true, true, false);
      }

    }, error => {
      this.setHidden(true, true, false);
    });
  }

}
