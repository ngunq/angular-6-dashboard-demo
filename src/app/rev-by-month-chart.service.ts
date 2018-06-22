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
export class RevByMonthChartService {
  hidden: boolean = true;
  loader: boolean = false;
  reload: boolean = true;
  stacked: boolean = true;
  data: any;
  id: string = "";
  time_select: any;

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

  drawChart(id: string, categories: any, series: any, tooltip: any, stacked: boolean) {
    let timeUnit = this.timeService.unit;

    let reportTime = this.timeService.buildTimeSelectParam(this.timeService.fromDate, this.timeService.toDate);
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
            return Highcharts.numberFormat(this.value / 1000000000, 0, '.', ',') + ' tỷ';
          }
        },
        "stackLabels": {
          "enabled": true,
          "formatter": function () {
            return Highcharts.numberFormat(this.total / 1000000000, 1, '.', ',');
          }
        }
      },
      "legend": {
        "enabled": this.stacked,
        verticalAlign: 'top',
        y: -10,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#FFF',
        borderWidth: 1,
        shadow: false
      },
      "tooltip": {
        "useHTML": true,
        "padding": 5,
        "backgroundColor": "rgba(0,0,0,0.7)",
        "style": {
          "color": "#fff",
          "fontSize": "11px"
        },
        "formatter": function () {
          console.log(this);
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
          let x = this.x;
          let data: any;
          if (stacked) {
            let name = this.series.name;
            data = tooltip[x][name];

          } else {
            data = tooltip[x];
          }
          let html = "<table class=\"table\" style=\"margin-bottom: 0;\"><thead class=\"thead-light\"><tr style=\"line-height: 4px; min-height: 4px;height: 4px;\"><th>Sản phẩm</th><th>Doanh thu</th><th>Tăng/Giảm</th><th>So " + unit.toLowerCase() + " trước</th></tr></thead><tbody>";
          let body = [];
          data.map(e => {
            html += "<tr style=\"line-height: 4px; min-height: 4px;height: 4px;\">";
            html += "<td>" + e["product"] + "</td><td>" + Highcharts.numberFormat(e["revenue"], 0, '.', ',') + "</td><td>" + Highcharts.numberFormat(e["inc/dec"], 0, '.', ',') + "</td><td>" + Highcharts.numberFormat(e["percent"], 1, '.', ',') + "%" + "</td>";
            html += "</tr>";
          });

          html += "</tbody></table>";
          return html;
        }
      },
      "plotOptions": {

        "series": {
          "cursor": "pointer",
          "events": {}
        },
        "column": {
          "stacking": id,
          "dataLabels": {
            "enabled": false
          }
        }
      },
      "series": series
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

  toggleStacked() {
    this.stacked = !this.stacked;
    this.prepareData();
  }

  getStackedLabel() {
    return this.stacked ? "View total" : "Năm phát hành";
  }

  prepareData() {
    let series = [];
    let tooltip: any;

    if (this.stacked) {
      let key = Object.keys(this.data.stackedchart).sort().reverse();
      key.map(k => {
        let tmp = {};
        tmp["name"] = k;
        tmp["data"] = this.data.stackedchart[k];
        series.push(tmp);
      });

      tooltip = this.data.stackedtooltip;
      let keys = Object.keys(tooltip);
      keys.map(key => {
        let ks = Object.keys(tooltip[key]);
        ks.map(k => {
          for (let i = 0; i < tooltip[key][k].length; i++) {
            for (let j = i + 1; j < tooltip[key][k].length; j++) {
              if (Math.abs(tooltip[key][k][i]["inc/dec"]) < Math.abs(tooltip[key][k][j]["inc/dec"])) {
                let t = tooltip[key][k][i];
                tooltip[key][k][i] = tooltip[key][k][j];
                tooltip[key][k][j] = t;
              }
            }
          }
        });
      });
    } else {
      let data = [];
      this.data.columnchart.map(e => {
        data.push(e["value"]);
      });
      let tmp = { name: "Doanh thu", data: data };
      series.push(tmp);
      tooltip = this.data.columntooltip;
      let keys = Object.keys(tooltip);
      keys.map(key => {
        for (let i = 0; i < tooltip[key].length; i++) {
          for (let j = i + 1; j < tooltip[key].length; j++) {
            if (Math.abs(tooltip[key][i]["inc/dec"]) < Math.abs(tooltip[key][j]["inc/dec"])) {
              let t = tooltip[key][i];
              tooltip[key][i] = tooltip[key][j];
              tooltip[key][j] = t;
            }
          }
        }
      });
    }
    this.drawChart(this.id, this.time_select, series, tooltip, this.stacked);
  }
  loadRevByMonth(url: string, time_select: any, id: string) {
    console.log(url);
    this.http.get(url).subscribe((response: any) => {
      if (response.toString() !== "-1") {
        console.log(response);
        this.data = response;
        this.time_select = time_select;
        this.id = id;
        this.prepareData();
      }
    }, error => {
      this.setHidden(true, true, false);
    });
  }

}
