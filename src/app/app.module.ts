import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { GametypeChartComponent } from './gametype-chart/gametype-chart.component';
import { DeptChartComponent } from './dept-chart/dept-chart.component';
import { CategoryChartComponent } from './category-chart/category-chart.component';
import { AreaListComponent } from './area-list/area-list.component';
import { GametypeListComponent } from './gametype-list/gametype-list.component';
import { DeptListComponent } from './dept-list/dept-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { TimeSelectComponent } from './time-select/time-select.component';
import { TopGameChartComponent } from './top-game-chart/top-game-chart.component';
import { SumaryComponent } from './sumary/sumary.component';
import { GrossRevComponent } from './gross-rev/gross-rev.component';
import { VsLastTimeComponent } from './vs-last-time/vs-last-time.component';
import { RevByMonthChartComponent } from './rev-by-month-chart/rev-by-month-chart.component';
import { AppRoutingModule } from './/app-routing.module';
import { SelectorComponent } from './selector/selector.component';
import { MainComponent } from './main/main.component';
import { AppScript } from './app.script';
import { AppannieDownloadComponent } from './appannie-download/appannie-download.component';
import { HardcoreOverviewComponent } from './hardcore-overview/hardcore-overview.component';
import { HardcoreDetailComponent } from './hardcore-detail/hardcore-detail.component';
import { HardcoreDetailRightComponent } from './hardcore-detail-right/hardcore-detail-right.component';
import { HardcoreDetailCateAComponent } from './hardcore-detail-cate-a/hardcore-detail-cate-a.component';
import { HardcoreDetailCateBComponent } from './hardcore-detail-cate-b/hardcore-detail-cate-b.component';
import { RpgDetailLeftComponent } from './rpg-detail-left/rpg-detail-left.component';
import { RpgDetailRightComponent } from './rpg-detail-right/rpg-detail-right.component';
import { KeyTitleCateAComponent } from './key-title-cate-a/key-title-cate-a.component';
import { KeyTitleCateBComponent } from './key-title-cate-b/key-title-cate-b.component';
import { KeyTitleCateCComponent } from './key-title-cate-c/key-title-cate-c.component';
import { KeyTitleProductComponent } from './key-title-product/key-title-product.component';
import { KeyTitleComponent } from './key-title/key-title.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PuChartComponent } from './pu-chart/pu-chart.component';
import { ArppuChartComponent } from './arppu-chart/arppu-chart.component';
import { AreaPuChartComponent } from './area-pu-chart/area-pu-chart.component';
import { CategoryPuChartComponent } from './category-pu-chart/category-pu-chart.component';
import { DeptPuChartComponent } from './dept-pu-chart/dept-pu-chart.component';
import { GametypePuChartComponent } from './gametype-pu-chart/gametype-pu-chart.component';
import { ByProductChartComponent } from './by-product-chart/by-product-chart.component';
import { RevTimeSelectComponent } from './rev-time-select/rev-time-select.component';



@NgModule({
  declarations: [
    AppComponent,
    AreaChartComponent,
    GametypeChartComponent,
    DeptChartComponent,
    CategoryChartComponent,
    AreaListComponent,
    GametypeListComponent,
    DeptListComponent,
    CategoryListComponent,
    ProductListComponent,
    TimeSelectComponent,
    TopGameChartComponent,
    SumaryComponent,
    GrossRevComponent,
    VsLastTimeComponent,
    RevByMonthChartComponent,
    SelectorComponent,
    MainComponent,
    AppannieDownloadComponent,
    HardcoreOverviewComponent,
    HardcoreDetailComponent,
    HardcoreDetailRightComponent,
    HardcoreDetailCateAComponent,
    HardcoreDetailCateBComponent,
    RpgDetailLeftComponent,
    RpgDetailRightComponent,
    KeyTitleCateAComponent,
    KeyTitleCateBComponent,
    KeyTitleCateCComponent,
    KeyTitleProductComponent,
    KeyTitleComponent,
    TopBarComponent,
    PuChartComponent,
    ArppuChartComponent,
    AreaPuChartComponent,
    CategoryPuChartComponent,
    DeptPuChartComponent,
    GametypePuChartComponent,
    ByProductChartComponent,
    RevTimeSelectComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    AppRoutingModule,

  ],
  providers: [
    AppScript,
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: (config: AppConfig) => () => config.load(), deps: [AppConfig], multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
