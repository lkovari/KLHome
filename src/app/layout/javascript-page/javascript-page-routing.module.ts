/**
 * Created by Laszlo Kovary on 4/13/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JavascriptPageTitleComponent } from './javascript-page-title.component';

const routes: Routes = [
  { path: '', component: JavascriptPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JavascriptPageRoutingModule { }
