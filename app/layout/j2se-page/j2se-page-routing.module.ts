/**
 * Created by lkovari on 2017.04.14..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { J2sePageTitleComponent } from './j2se-page-title.component';

const routes: Routes = [
  { path: '', component: J2sePageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class J2sePageRoutingModule { }
