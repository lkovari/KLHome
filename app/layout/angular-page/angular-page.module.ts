import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { AngularPageTitleComponent } from './angular-page-title.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';
import { AngularPageRoutingModule } from './angular-page-routing.module';
import { AngularPageContent2Component } from './angular-page-content2/angular-page-content2.component';
import { AngularPageContent3Component } from './angular-page-content3/angular-page-content3.component';
import { AngularPageContent4Component } from './angular-page-content4/angular-page-content4.component';
import { AngularPageContent5Component } from './angular-page-content5/angular-page-content5.component';
import { TabMenuModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SharedModule,
    AngularPageRoutingModule,
    PageHeaderModule,
    TabMenuModule
  ],
  declarations: [ AngularPageTitleComponent,
                  AngularPageContent1Component,
                  AngularPageContent2Component,
                  AngularPageContent3Component,
                  AngularPageContent4Component,
                  AngularPageContent5Component],
  exports: [ AngularPageTitleComponent,
             AngularPageContent1Component,
             AngularPageContent2Component,
             AngularPageContent3Component,
             AngularPageContent4Component,
             AngularPageContent5Component]
})
export class AngularPageModule { }
