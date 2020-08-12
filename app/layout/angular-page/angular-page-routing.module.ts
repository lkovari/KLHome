/**
 * Created by Laszlo Kovary on 4/13/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AngularPageTitleComponent } from './angular-page-title.component';

const routes: Routes = [
  { path: '', component: AngularPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularPageRoutingModule { }
