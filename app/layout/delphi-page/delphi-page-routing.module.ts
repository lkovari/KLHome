/**
 * Created by Laszlo Kovary on 2017.04.15..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelphiPageTitleComponent } from './delphi-page-title.component';

const routes: Routes = [
  { path: '', component: DelphiPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelphiPageRoutingModule { }
