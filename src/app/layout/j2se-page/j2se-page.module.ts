import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { J2sePageTitleComponent } from './j2se-page-title.component';
import { J2sePageContent1Component } from './j2se-page-content1/j2se-page-content1.component';
import { J2sePageContent2Component } from './j2se-page-content2/j2se-page-content2.component';
import { J2sePageContent3Component } from './j2se-page-content3/j2se-page-content3.component';
import { J2sePageRoutingModule } from './j2se-page-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    SharedModule,
    J2sePageRoutingModule,
    PageHeaderModule
  ],
  declarations: [J2sePageTitleComponent, J2sePageContent1Component, J2sePageContent2Component, J2sePageContent3Component],
  exports: [J2sePageTitleComponent, J2sePageContent1Component, J2sePageContent2Component, J2sePageContent3Component]
})
export class J2sePageModule { }
