import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { J2eePageTitleComponent } from './j2ee-page-title.component';
import { J2eePageContent1Component } from './j2ee-page-content1/j2ee-page-content1.component';
import { J2eePageContent2Component } from './j2ee-page-content2/j2ee-page-content2.component';
import { J2eePageRoutingModule } from './j2ee-page-routing.module';
import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    J2eePageRoutingModule,
    PageHeaderModule
  ],
  declarations: [J2eePageTitleComponent, J2eePageContent1Component, J2eePageContent2Component],
  exports: [J2eePageTitleComponent, J2eePageContent1Component, J2eePageContent2Component]
})
export class J2eePageModule { }
