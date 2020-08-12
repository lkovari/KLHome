/**
 * Created by Laszlo Kovary on 2017.04.15..
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MasmPageTitleComponent } from './masm-page-title.component';
import { MasmPageContent1Component } from './masm-page-content1/masm-page-content1.component';
import { MasmPageContent2Component } from './masm-page-content2/masm-page-content2.component';

const routes: Routes = [
    { path: '', component: MasmPageTitleComponent },
    { path: 'masm-page-content1', component: MasmPageContent1Component },
    { path: 'masm-page-content2', component: MasmPageContent2Component }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasmPageRoutingModule { }
