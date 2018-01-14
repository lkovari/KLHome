import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutPageTitleComponent } from 'app/shared/components/layout-page-title/layout-page-title.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  declarations: [LayoutPageTitleComponent],
  exports: [LayoutPageTitleComponent]
})
export class SharedModule { }
