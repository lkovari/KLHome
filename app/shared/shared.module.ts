import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TextInputComponent } from './components/text-input/text-input.component';
import { CustomCalendarComponent } from './components/custom-calendar/custom-calendar.component';
import { HttpClientModule } from '@angular/common/http';
import { FileLoaderService } from './services/fileloader/file-loader.service';
import { TextDisplayComponent } from './components/text-display/text-display.component';
import { ComplexNameComponent } from './components/complex-name/complex-name.component';
import { AddressComponent } from './components/address/address.component';
import { CustomInputMaskComponent } from './components/custom-input-mask/custom-input-mask.component';
import { DisplayFormStateComponent } from './components/display-form-state/display-form-state.component';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { InputMaskModule } from 'primeng/inputmask';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { TooltipModule } from 'primeng';
import { CustomTextAreaDirective } from './directives/custom-textarea.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    DialogModule,
    EditorModule,
    HttpClientModule,
    InputMaskModule,
    TooltipModule
  ],
  providers: [FileLoaderService],
  declarations: [TextInputComponent, CustomCalendarComponent, TextDisplayComponent, ComplexNameComponent, AddressComponent,
    CustomInputMaskComponent, DisplayFormStateComponent, BarChartComponent, CustomTextAreaDirective],
  exports: [TextInputComponent, CustomCalendarComponent, TextDisplayComponent, ComplexNameComponent, AddressComponent,
    CustomInputMaskComponent, DisplayFormStateComponent, BarChartComponent, CustomTextAreaDirective]
})
export class SharedModule { }
