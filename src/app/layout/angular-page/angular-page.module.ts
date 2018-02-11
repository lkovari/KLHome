import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { AngularPageTitleComponent } from './angular-page-title.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';
import { AngularPageRoutingModule } from './angular-page-routing.module';
import { AngularPageContent2Component } from './angular-page-content2/angular-page-content2.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    AngularPageRoutingModule
  ],
  declarations: [AngularPageTitleComponent, AngularPageContent1Component, AngularPageContent2Component],
  exports: [AngularPageTitleComponent, AngularPageContent1Component, AngularPageContent2Component]
})
export class AngularPageModule { }
