import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeSelectService } from "./time-select.service";

import * as Highcharts from 'highcharts';
import { AppScript } from './app.script';


@Injectable({
  providedIn: 'root'
})
export class PuChartService {
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

  drawChart(id: string, categories: any, data: any, tooltip: any) {
    let timeUnit = this.timeService.unit;
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
          "text": "USER"
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
          // let toolTipTemplate = ["Paying user", "Compare last " + unit, "Report " + unit];
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
          let toolTipTemplate = ["Số lượng", "So " + unit.toLowerCase() + " trước", unit + " báo cáo"];

          let tooltipValue = [Highcharts.numberFormat(y, 0, '.', ','), tooltip[x] + "%", x];
          let html = "<div style = \"width: 250px;\">";
          for (let i = 0; i < toolTipTemplate.length; i++) {
            html += "<div class=\"row mb5\">" +
              "<div class=\"col-md-6 col-xs-6 col-sm-6 text-right\" style=\"color: #999;\">" +
              toolTipTemplate[i] +
              "</div>" +
              "<div class=\"col-md-6 col-xs-6 col-sm-6 text-left\"><strong>" +
              tooltipValue[i] +
              "</strong></div>" +
              "</div>";
          }
          html += "</div>";

          return html;

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
              return Highcharts.numberFormat(this.y / 1000, 0, '.', ',') + 'k';
            }
          }
        }
      },
      "series": [
        {
          "name": "PU",
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

  loadPu(url: string, time_select: any, id: string) {
    console.log(url);

    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        let data = [];
        let tooltip: any = {};
        let categories = [];
        time_select.map(key => {
          if (data.length > 0) {
            data.push(response[key][0]["value"]);
            tooltip[key] = response[key][0]["tooltip"].toFixed(1);
            categories.push(key);
          } else {
            if (response[key][0]["value"] !== null) {
              data.push(response[key][0]["value"]);
              tooltip[key] = response[key][0]["tooltip"].toFixed(1);
              categories.push(key);
            }
          }
        });

        this.drawChart(id, categories, data, tooltip);
      }
    }, error => {
      this.setHidden(true, true, false);
    });
  }

}
