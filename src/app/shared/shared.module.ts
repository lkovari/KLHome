import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LayoutPageTitleComponent } from 'app/shared/components/layout-page-title/layout-page-title.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CalendarModule } from 'primeng/primeng';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CalendarModule
  ],
  declarations: [LayoutPageTitleComponent, TextInputComponent, CustomCalendarComponent],
  exports: [LayoutPageTitleComponent, TextInputComponent, CustomCalendarComponent]
})
export class SharedModule { }
