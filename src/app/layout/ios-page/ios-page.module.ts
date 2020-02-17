import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { IosPageTitleComponent } from './ios-page-title.component';
import { IosPageContent1Component } from './ios-page-content1/ios-page-content1.component';
import { IosPageContent2Component } from './ios-page-content2/ios-page-content2.component';
import { IosPageRoutingModule } from './ios-page-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { AccordionModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    IosPageRoutingModule,
    PageHeaderModule,
    AccordionModule
  ],
  declarations: [IosPageTitleComponent, IosPageContent1Component, IosPageContent2Component],
  exports: [IosPageTitleComponent, IosPageContent1Component, IosPageContent2Component]
})
export class IosPageModule { }
