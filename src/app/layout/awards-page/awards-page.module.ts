import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { AwardsPageRoutingModule } from './awards-page-routing.module';
import { AwardsContentComponent } from './awards-content.component';
import { SharedModule } from 'primeng';

@NgModule({
imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    SharedModule,
    AwardsPageRoutingModule,
    PageHeaderModule
  ],
  declarations: [AwardsContentComponent],
  exports: [AwardsContentComponent]
})
export class AwardsPageModule { }
