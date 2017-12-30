/**
 * Created by lkovari on 2017.04.13..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IosPageTitleComponent } from './ios-page-title.component';
import { IosPageContent1Component } from './ios-page-content1/ios-page-content1.component';
import { IosPageContent2Component } from './ios-page-content2/ios-page-content2.component';

const routes: Routes = [
  { path: '', component: IosPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IosPageRoutingModule { }
