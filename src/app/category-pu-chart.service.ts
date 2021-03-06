import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSelectService } from "./time-select.service";

import * as Highcharts from 'highcharts';
import { AppScript } from './app.script';


@Injectable({
  providedIn: 'root'
})
export class CategoryPuChartService {
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

  constructor(private http: HttpClient, private timeService: TimeSelectService) { }

  setOptions() {
    Highcharts.createElement('link', {
      href: 'assets/css/font.css',
      rel: 'stylesheet',
      type: 'text/css'
    }, null, document.getElementsByTagName('head')[0]);
    Highcharts.setOptions(this.chartOptions);
  }

  drawChart(id: string, name: string, categories: any, data: any, tt: any, rootUrl: string, timeUnit: string, timeSelect: string, areaService: any, categoryService: any, deptService: any, gametypeService: any) {
    let option = {
      "chart": {
        "type": "bar"
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
            return Highcharts.numberFormat(this.value / 1000, 0, '.', ',') + 'k';
          }
        },
      },
      "legend": {
        "enabled": false
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
          // switch (timeUnit) {
          //   case "month":
          //     unit = "month";
          //     break;

          //   case "quarter":
          //     unit = "quarter";
          //     break;

          //   case "year":
          //     unit = "year";
          //     break;
          // }
          // let toolTipTemplate = ["Game category", "Paying user", "Compare last " + unit, "Report " + unit];

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
          let toolTipTemplate = ["Phân loại", "Số lượng", "So " + unit.toLowerCase() + " trước", unit + " báo cáo"];

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

              let cate = "";

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
                      cate = "";
                      // categoryService.hidden = true;
                      categoryService.setHidden(true, false, true);
                      categoryService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", cate, "", "", ""), areaService, categoryService, deptService, gametypeService, "category-pu-chart");
                    } else {
                      sData[j].color = 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',0.3)';
                      //reload
                      cate = category;
                    }
                  } else {
                    sData[j].color = themeColor;
                  }
                }
                series[i].update({ data: sData }, true, false);
                cate.replace(" ", "%20");
                areaService.setHidden(true, false, true);
                deptService.setHidden(true, false, true);
                gametypeService.setHidden(true, false, true);

                areaService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", cate, "", "", ""), areaService, categoryService, deptService, gametypeService, "area-pu-chart");
                deptService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", cate, "", "", ""), areaService, categoryService, deptService, gametypeService, "dept-pu-chart");
                gametypeService.loadStaticChart(rootUrl, timeUnit, timeSelect, AppScript.buildFilter("", cate, "", "", ""), areaService, categoryService, deptService, gametypeService, "gametype-pu-chart");
              }
            }
          }
        },
        "bar": {
          "dataLabels": {
            "enabled": true,
            "formatter": function () {
              return Highcharts.numberFormat(this.y / 1000, 0, '.', ',') + 'k';
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

  setHidden(hidden: boolean, loader: boolean, reload: boolean) {
    this.hidden = hidden;
    this.loader = loader;
    this.reload = reload;
  }

  loadStaticChart(rootUrl: string, timeUnit: string, timeSelect: string, filter: string, areaService: any, cateService: any, deptService: any, gametypeService: any, id: string) {
    let url = rootUrl + "metrics/pu/category?time_unit=" + timeUnit + "&time_select=" + timeSelect + filter;
    console.log(url);

    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        let name = Object.keys(response)[0];
        let categories = [];
        let data = [];
        let tooltip = {};

        response[Object.keys(response)[0]].map((e: any) => {
          let keys = Object.keys(e);
          keys.map(k => {
            if (k !== "tooltip") {
              categories.push(k);
              data.push(e[k]);
              tooltip[k] = e["tooltip"].toFixed(2);
            }
          });
        });

        for (let i = 0; i < data.length; i++) {
          for (let j = i + 1; j < data.length; j++) {
            if (data[i] < data[j]) {
              let tmp = data[i];
              data[i] = data[j];
              data[j] = tmp;
              tmp = categories[i];
              categories[i] = categories[j];
              categories[j] = tmp;
            }
          }
        }

        this.drawChart(id, "PU" + name, categories, data, tooltip, rootUrl, timeUnit, timeSelect, areaService, cateService, deptService, gametypeService);
      } else {
        this.setHidden(true, true, false);

      }

    }, error => {
      this.setHidden(true, true, false);
    });
  }

}
