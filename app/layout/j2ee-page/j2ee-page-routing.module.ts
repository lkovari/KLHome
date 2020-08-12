/**
 * Created by Laszlo Kovary on 2017.04.14..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { J2eePageTitleComponent } from './j2ee-page-title.component';

const routes: Routes = [
  { path: '', component: J2eePageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class J2eePageRoutingModule { }
