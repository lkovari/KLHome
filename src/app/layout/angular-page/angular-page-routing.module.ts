/**
 * Created by LKovari on 4/13/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularPageTitleComponent } from './angular-page-title.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';


const routes: Routes = [
  { path: '', component: AngularPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularPageRoutingModule { }
