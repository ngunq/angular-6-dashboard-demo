import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  filterList = [];
  value = "";

  constructor(private http: HttpClient) { }

  getFilterList(url: string) {
    this.http.get(url).subscribe((response: any) => {
      console.log(response);
      this.filterList = response;
    });
  }

}
