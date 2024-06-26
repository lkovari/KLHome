/**
 * Created by Laszlo Kovary on 4/11/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlankPageComponent } from './blank-page.component';

const routes: Routes = [
  { path: '', component: BlankPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlankPageRoutingModule { }
