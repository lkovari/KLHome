import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { CsharpPageTitleComponent } from '../../layout/csharp-page/csharp-page-title.component';
import { CsharpPageContent1Component } from './csharp-page-content1/csharp-page-content1.component';
import { CsharpPageContent2Component } from './csharp-page-content2/csharp-page-content2.component';
import { CsharpPageRoutingModule } from './csharp-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { CsharpPageContent3Component } from './csharp-page-content3/csharp-page-content3.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    CsharpPageRoutingModule,
    PageHeaderModule
  ],
  declarations: [CsharpPageTitleComponent, CsharpPageContent1Component, CsharpPageContent2Component, CsharpPageContent3Component],
  exports: [CsharpPageTitleComponent, CsharpPageContent1Component, CsharpPageContent2Component]
})
export class CsharpPageModule { }
