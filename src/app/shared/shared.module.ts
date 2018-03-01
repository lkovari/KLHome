import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CalendarModule, DialogModule, EditorModule } from 'primeng/primeng';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { FileLoaderService } from './services/fileloader/file-loader.service';
import { TextDisplayComponent } from './components/text-display/text-display.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CalendarModule,
    DialogModule,
    EditorModule,
    HttpClientModule
  ],
  providers: [FileLoaderService],
  declarations: [TextInputComponent, CustomCalendarComponent, TextDisplayComponent],
  exports: [TextInputComponent, CustomCalendarComponent, TextDisplayComponent]
})
export class SharedModule { }
