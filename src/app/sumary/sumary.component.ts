import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sumary',
  templateUrl: './sumary.component.html',
  styleUrls: ['./sumary.component.css']
})
export class SumaryComponent implements OnInit {
  navigatorVisible = false;
  constructor() { }

  ngOnInit() {
  }

  navigate(visible: boolean) {
    this.navigatorVisible = visible;
  }
}
