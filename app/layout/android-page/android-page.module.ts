import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AndroidPageTitleComponent } from '../../layout/android-page/android-page-title.component';
import { AndroidPageContent1Component } from './android-page-content1/android-page-content1.component';
import { AndroidPageContent2Component } from './android-page-content2/android-page-content2.component';
import { AndroidPageContent3Component } from './android-page-content3/android-page-content3.component';
import { AndroidPageContent4Component } from './android-page-content4/android-page-content4.component';
import { AndroidPageContent5Component } from './android-page-content5/android-page-content5.component';
import { AndroidPageRoutingModule } from './android-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    AndroidPageRoutingModule,
    PageHeaderModule
  ],
  declarations: [AndroidPageTitleComponent, AndroidPageContent1Component,
                AndroidPageContent2Component, AndroidPageContent3Component,
                AndroidPageContent4Component, AndroidPageContent5Component],
  exports: [AndroidPageTitleComponent, AndroidPageContent1Component,
    AndroidPageContent2Component, AndroidPageContent3Component,
    AndroidPageContent4Component, AndroidPageContent5Component]
})
export class AndroidPageModule { }
