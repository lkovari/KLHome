import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

import { JavascriptPageTitleComponent } from './javascript-page-title.component';
import { JavascriptPageContent1Component } from './javascript-page-content1/javascript-page-content1.component';
import { JavascriptPageContent2Component } from './javascript-page-content2/javascript-page-content2.component';
import { JavascriptPageRoutingModule } from './javascript-page-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    SharedModule,
    JavascriptPageRoutingModule,
    PageHeaderModule
  ],
  declarations: [JavascriptPageTitleComponent, JavascriptPageContent1Component, JavascriptPageContent2Component],
  exports: [JavascriptPageTitleComponent, JavascriptPageContent1Component, JavascriptPageContent2Component]
})
export class JavascriptPageModule { }
