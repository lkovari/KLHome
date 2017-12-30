/**
 * Created by lkovari on 2017.04.15..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CsharpPageTitleComponent } from './csharp-page-title.component';
import { CsharpPageContent1Component } from './csharp-page-content1/csharp-page-content1.component';
import { CsharpPageContent2Component } from './csharp-page-content2/csharp-page-content2.component';

const routes: Routes = [
  { path: '', component: CsharpPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsharpPageRoutingModule { }
