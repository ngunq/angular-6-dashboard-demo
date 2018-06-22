import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { resolve } from 'dns';

@Injectable()
export class AppScript {

  constructor(private http: HttpClient) { }

  static hexToRgb(hex: any) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  static buildFilter(area: string, category: string, dept: string, gametype: string, product: string) {
    let filter = "&filters=";
    if (area !== "") {
      filter += "area=" + area + ";";
    }
    if (category !== "") {
      filter += "category=" + category + ";";
    }
    if (dept !== "") {
      filter += "dept=" + dept + ";";
    }
    if (gametype !== "") {
      filter += "gametype=" + gametype + ";";
    }
    if (product !== "") {
      filter += "product=" + product + ";";
    }
    if (filter === "&filters=") filter = "";
    return filter;
  }

  static numberWithCommas(x) {
    if (x === undefined || x === null)
      return "n/a";
    else if (!x.toString().includes("-"))
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    else
      return x;
  }
}
