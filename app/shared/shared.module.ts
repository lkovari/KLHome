import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CalendarModule, DialogModule, EditorModule } from 'primeng/primeng';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { FileLoaderService } from './services/fileloader/file-loader.service';
import { TextDisplayComponent } from './components/text-display/text-display.component';
import { ComplexNameComponent } from './components/complex-name/complex-name.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DialogModule,
    EditorModule,
    HttpClientModule
  ],
  providers: [FileLoaderService],
  declarations: [TextInputComponent, CustomCalendarComponent, TextDisplayComponent, ComplexNameComponent],
  exports: [TextInputComponent, CustomCalendarComponent, TextDisplayComponent, ComplexNameComponent]
})
export class SharedModule { }
