import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AngularPageTitleComponent } from './angular-page-title.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';
import { AngularPageRoutingModule } from './angular-page-routing.module';
import { SharedModule } from 'app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    AngularPageRoutingModule
  ],
  declarations: [AngularPageTitleComponent, AngularPageContent1Component],
  exports: [AngularPageTitleComponent, AngularPageContent1Component]
})
export class AngularPageModule { }
