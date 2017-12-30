import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutmeContentComponent } from './aboutme-content.component';
import { AboutmePageRoutingModule } from './aboutme-page-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    AboutmePageRoutingModule
  ],
  declarations: [AboutmeContentComponent],
  exports: [AboutmeContentComponent]
})
export class AboutmePageModule { }
