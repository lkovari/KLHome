/**
 * Created by lkovari on 2017.04.14..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { J2sePageTitleComponent } from './j2se-page-title.component';
import { J2sePageContent1Component } from './j2se-page-content1/j2se-page-content1.component';
import { J2sePageContent2Component } from './j2se-page-content2/j2se-page-content2.component';
import { J2sePageContent3Component } from './j2se-page-content3/j2se-page-content3.component';

const routes: Routes = [
  { path: '', component: J2sePageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class J2sePageRoutingModule { }
