/**
 * Created by Laszlo Kovary on 2017.04.13..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IosPageTitleComponent } from './ios-page-title.component';

const routes: Routes = [
  { path: '', component: IosPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IosPageRoutingModule { }
