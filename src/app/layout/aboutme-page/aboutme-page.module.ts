import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutmeContentComponent } from './aboutme-content.component';
import { AboutmePageRoutingModule } from './aboutme-page-routing.module';
import { SharedModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbModule.forRoot(),
    FormsModule,
    AboutmePageRoutingModule
  ],
  declarations: [AboutmeContentComponent],
  exports: [AboutmeContentComponent]
})
export class AboutmePageModule { }
