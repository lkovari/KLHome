/**
 * Created by lkovari on 2017.04.15..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DelphiPageTitleComponent } from './delphi-page-title.component';
import { DelphiPageContent1Component } from './delphi-page-content1/delphi-page-content1.component';
import { DelphiPageContent2Component } from './delphi-page-content2/delphi-page-content2.component';
import { DelphiPageContent3Component } from './delphi-page-content3/delphi-page-content3.component';
import { DelphiPageContent4Component } from './delphi-page-content4/delphi-page-content4.component';


const routes: Routes = [
  { path: '', component: DelphiPageTitleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DelphiPageRoutingModule { }
