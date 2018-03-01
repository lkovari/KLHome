import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { RouterModule } from '@angular/router';
import { NotFoundRoutingModule } from './not-found-routing.module';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule,
    RouterModule
  ],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent]
})
export class NotFoundModule { }
