import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { AppannieDownloadComponent } from "./appannie-download/appannie-download.component";
import { SelectorComponent } from "./selector/selector.component";

const routes: Routes = [
  { path: 'appannie-download-main', component: AppannieDownloadComponent },
  { path: 'rev-main', component: MainComponent },
  { path: '', component: SelectorComponent },
  // { path: '', redirectTo: '/index.html', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
