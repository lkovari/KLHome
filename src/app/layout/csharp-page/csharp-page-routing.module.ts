/**
 * Created by lkovari on 2017.04.15..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsharpPageTitleComponent } from './csharp-page-title.component';

const routes: Routes = [
  { path: '', component: CsharpPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsharpPageRoutingModule { }
