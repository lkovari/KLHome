import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliciesPageComponent } from './policies-page.component';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PageHeaderModule
  ],
  declarations: [PoliciesPageComponent],
  exports: [PoliciesPageComponent]
})
export class PoliciesPageModule { }
