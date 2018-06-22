// declare var require: any;
// const $ = require('jquery');
import * as jQuery from 'jquery';
export function testing(url, callback) {
  jQuery.ajax({
    method: "GET",
    url: url,
    success: callback
  });
}
