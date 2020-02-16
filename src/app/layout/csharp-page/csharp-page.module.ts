import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { CsharpPageTitleComponent } from 'app/layout/csharp-page/csharp-page-title.component';
import { CsharpPageContent1Component } from './csharp-page-content1/csharp-page-content1.component';
import { CsharpPageContent2Component } from './csharp-page-content2/csharp-page-content2.component';
import { CsharpPageRoutingModule } from './csharp-page-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    CsharpPageRoutingModule,
    PageHeaderModule
  ],
  declarations: [CsharpPageTitleComponent, CsharpPageContent1Component, CsharpPageContent2Component],
  exports: [CsharpPageTitleComponent, CsharpPageContent1Component, CsharpPageContent2Component]
})
export class CsharpPageModule { }
