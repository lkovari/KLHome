import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderModule } from 'src/app/shared/modules/page-header/page-header.module';
import { FormsModule } from '@angular/forms';
import { VuejsPageTitleComponent } from './vuejs-page-title.component';
import { VuejsPageContent0Component } from './vuejs-page-content0/vuejs-page-content0.component';
import { VuejsPageRoutingModule } from './vuejs-page-routing.module';


@NgModule({
  imports: [
    CommonModule,
    VuejsPageRoutingModule,
    FormsModule,
    PageHeaderModule
  ],
  declarations: [ VuejsPageTitleComponent, VuejsPageContent0Component ],
  exports: [ VuejsPageTitleComponent, VuejsPageContent0Component ],
})
export class VuejsPageModule { }
