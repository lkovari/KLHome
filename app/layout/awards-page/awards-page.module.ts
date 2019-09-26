import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { PageHeaderModule } from 'app/shared/modules/page-header/page-header.module';
import { AwardsPageRoutingModule } from './awards-page-routing.module';
import { AwardsContentComponent } from './awards-content.component';

@NgModule({
imports: [
    CommonModule,
    NgbModule.forRoot(),
    FormsModule,
    SharedModule,
    AwardsPageRoutingModule,
    PageHeaderModule
  ],
  declarations: [AwardsContentComponent],
  exports: [AwardsContentComponent]
})
export class AwardsPageModule { }
