/**
 * Created by LKovari on 4/13/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JavascriptPageTitleComponent } from './javascript-page-title.component';
import { JavascriptPageContent1Component } from './javascript-page-content1/javascript-page-content1.component';
import { JavascriptPageContent2Component } from './javascript-page-content2/javascript-page-content2.component';

const routes: Routes = [
  { path: '', component: JavascriptPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JavascriptPageRoutingModule { }
