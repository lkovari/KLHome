/**
 * Created by lkovari on 2017.04.14..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { J2eePageTitleComponent } from './j2ee-page-title.component';
import { J2eePageContent1Component } from './j2ee-page-content1/j2ee-page-content1.component';
import { J2eePageContent2Component } from './j2ee-page-content2/j2ee-page-content2.component';

const routes: Routes = [
  { path: '', component: J2eePageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class J2eePageRoutingModule { }
