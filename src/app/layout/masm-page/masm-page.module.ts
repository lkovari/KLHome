import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MasmPageTitleComponent } from './masm-page-title.component';
import { MasmPageContent1Component } from './masm-page-content1/masm-page-content1.component';
import { MasmPageContent2Component } from './masm-page-content2/masm-page-content2.component';
import { MasmPageRoutingModule } from './masm-page-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from '../../shared';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    MasmPageRoutingModule,
    PageHeaderModule,
    MasmPageRoutingModule
  ],
  declarations: [MasmPageTitleComponent, MasmPageContent1Component, MasmPageContent2Component],
  exports: [MasmPageTitleComponent, MasmPageContent1Component, MasmPageContent2Component]
})
export class MasmPageModule { }
