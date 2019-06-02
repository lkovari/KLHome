/**
 * Created by lkovari on 2017.04.13..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AndroidPageTitleComponent } from './android-page-title.component';

const routes: Routes = [
  { path: '', component: AndroidPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndroidPageRoutingModule { }
