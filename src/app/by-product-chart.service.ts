import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSelectService } from "./time-select.service";

import * as Highcharts from 'highcharts';
import { AppScript } from './app.script';

@Injectable({
  providedIn: 'root'
})
export class ByProductChartService {
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

  drawChart(id: string, categories: any, timeUnit: string, revData: any, revTooltip: any, puData: any, puTooltip: any) {
    let option = {
      "chart": {
        // "type": "bar"
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
      "yAxis": [{
        "min": 0,
        "title": {
          "text": "REVENUE"
        },
        "labels": {
          "formatter": function () {
            return Highcharts.numberFormat(this.value / 1000000000, 0, '.', ',') + ' tỷ';
          }
        },
      }, {
        "min": 0,
        "title": {
          "text": "PAYING USER"
        },
        "labels": {
          "formatter": function () {
            return Highcharts.numberFormat(this.value / 1000, 0, '.', ',') + 'k';
          }
        },
        "opposite": true
      }],
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
          let type = this.series.type;
          // let data = this.series.data;
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
          let toolTipTemplate = [];
          let tooltipValue = [];

          if (type === "column") {
            toolTipTemplate = ["Doanh thu", "So " + unit.toLowerCase() + " trước", unit + " báo cáo"];
            tooltipValue = [Highcharts.numberFormat(y, 0, '.', ','), revTooltip[x] + "%", x];
          } else {
            toolTipTemplate = ["Số lượng", "So " + unit.toLowerCase() + " trước", unit + " báo cáo"];
            tooltipValue = [Highcharts.numberFormat(y, 0, '.', ','), puTooltip[x] + "%", x];
          }
          let tooltip = "<div style = \"width: 230px;\">";
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
        "column": {
          "dataLabels": {
            "enabled": true,
            "formatter": function () {
              return Highcharts.numberFormat(this.y / 1000000000, 1, '.', ',');
            }
          }
        },
        "line": {
          "dataLabels": {
            "enabled": false,
            "formatter": function () {
              return Highcharts.numberFormat(this.y / 1000, 0, '.', ',') + 'k';
            }
          }
        }
      },
      "series": [
        {
          "name": "revenue",
          "data": revData,
          "type": "column",
          "yAxis": 0
        },
        {
          "name": "pu",
          "data": puData,
          "type": "line",
          "yAxis": 1
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

  loadByProduct(rootUrl: string, timeUnit: string, timeSelect: any, filter: string, id: string) {
    let url = rootUrl + "metrics/revenue/?time_unit=" + timeUnit + "&time_select=" + timeSelect.toString() + filter;
    let url1 = rootUrl + "metrics/pu/?time_unit=" + timeUnit + "&time_select=" + timeSelect.toString() + filter;
    console.log(url);
    console.log(url1);

    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        let revData = [];
        let revTooltip = {};
        for (let i = 0; i < timeSelect.length; i++) {
          revData.push(response.columnchart[i]["value"]);
          revTooltip[timeSelect[i]] = response.columnchart[i]["tooltip"].toFixed(1);
        }
        this.http.get(url1).subscribe((res: any) => {
          if (res.toString() !== "-1") {
            let puData = [];
            let puTooltip: any = {};

            timeSelect.map(key => {
              puData.push(res[key][0]["value"]);
              puTooltip[key] = res[key][0]["tooltip"].toFixed(1);
            });
            this.drawChart(id, timeSelect, timeUnit, revData, revTooltip, puData, puTooltip);
          } else {
            this.setHidden(true, true, false);
          }
        }, error => {
          this.setHidden(true, true, false);
        });
      } else {
        this.setHidden(true, true, false);
      }
    }, error => {
      this.setHidden(true, true, false);
    });
  }

}
