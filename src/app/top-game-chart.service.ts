import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSelectService } from "./time-select.service";

import * as Highcharts from 'highcharts';
// import * as exporting from 'highcharts/modules/exporting.src';
// import * as csv from 'highcharts/modules/export-data.src';

// exporting(Highcharts);
// csv(Highcharts);


@Injectable({
  providedIn: 'root'
})
export class TopGameChartService {
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

  drawChart(id: string, name: string, categories: any, data: any, tt: any) {
    let reportTime = this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate);
    let timeUnit = this.timeService.unit;
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
            return Highcharts.numberFormat(this.value / 1000000000, 0, '.', ',') + ' tỷ';
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
          let toolTipTemplate = ["Sản phẩm", "Doanh thu", "So " + unit.toLowerCase() + " trước", unit + " báo cáo"];
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
          let tooltipValue = [x, Highcharts.numberFormat(y, 0, '.', ','), tt[x] + "%", reportTime];
          let tooltip = "<div style = \"width: 300px;\">";
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
          "events": {}
        },
        "bar": {
          "dataLabels": {
            "enabled": true,
            "formatter": function () {
              return Highcharts.numberFormat(this.y / 1000000000, 1, '.', ',');
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

  loadTopGame(url: string, id: string) {
    console.log(url);
    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        console.log(response);
        let name = "Doanh thu";
        let categories = [];
        let data = [];
        let tooltip = {};

        response.map((e: any) => {
          let keys = Object.keys(e);
          keys.map(k => {
            if (k !== "tooltip") {
              categories.push(k);
              data.push(e[k]);
              tooltip[k] = e["tooltip"].toFixed(2);
            }
          });
        });
        this.drawChart(id, name, categories, data, tooltip);
      }
    }, error => {
      this.setHidden(true, true, false);
    });
  }

}
