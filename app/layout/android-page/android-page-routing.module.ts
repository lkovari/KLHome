/**
 * Created by lkovari on 2017.04.13..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndroidPageTitleComponent } from './android-page-title.component';
import { AndroidPageContent1Component } from './android-page-content1/android-page-content1.component';
import { AndroidPageContent2Component } from './android-page-content2/android-page-content2.component';
import { AndroidPageContent3Component } from './android-page-content3/android-page-content3.component';
import { AndroidPageContent4Component } from './android-page-content4/android-page-content4.component';
import { AndroidPageContent5Component } from './android-page-content5/android-page-content5.component';


const routes: Routes = [
  { path: '', component: AndroidPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidPageRoutingModule { }
