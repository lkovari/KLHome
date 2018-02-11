/**
 * Created by lkovari on 2018.02.08.
 */
import {Component, EventEmitter, OnInit, Input, Output, ViewChild, NgModule, forwardRef, ExistingProvider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, NgModel } from '@angular/forms';
import {Calendar} from 'primeng/primeng';

const CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomCalendarComponent),
  multi: true
};


@Component({
  selector: 'app-custom-calendar',
  templateUrl: './custom-calendar.component.html',
  styleUrls: ['./custom-calendar.component.scss'],
  providers: [CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR]
})
export class CustomCalendarComponent implements OnInit, ControlValueAccessor {
  @Input() disabledDays = new Array<number>();
  @Input() showIcon: boolean;
  @Input() required = false;
  @Input() showButtonBar = true;
  private _date: Date;
  get date() {
      return this._date;
  }
  set date(date: Date) {
      this._date = date;
  }
  private _name: string;
  get name() {
      return this._name;
  }
  set name(name: string) {
      this._name = name;
  }
  @Output() onTodayClicked = new EventEmitter<Date>();
  @Output() onDateClicked = new EventEmitter<Date>();
  @Output() onModelChanged = new EventEmitter<Date>();
  @ViewChild('Model') calendarModel: NgModel;

  disabled: boolean;

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor() {
  }

  ngOnInit() {
  }


  onSelect(event) {
      this.onModelTouched();
      this.onModelChange(event);
      this.onDateClicked.emit(event);
  }

  onTodayClick(date: Date) {
      this.onModelTouched();
      this.onModelChange(date);
      this.onTodayClicked.emit(date);
  }
  onClearClick($event) {
      this.onModelTouched();
      this.onModelChange(null);
      this.onDateClicked.emit(null);
  }

  onNgModelChange(date: Date) {
      this.onModelTouched();
      this.onModelChange(date);
      this.onModelChanged.emit(date);
  }

 /*
  * Writes a new value to the element.
  *
  * This method will be called by the forms API to write to the view when programmatic
  * (model -> view) changes are requested.
  */
  writeValue(date: Date): void {
      this._date = date;
  }

 /*
  * Registers a callback function that should be called when the control's value
  * changes in the UI.
  *
  * This is called by the forms API on initialization so it can update the form
  * model when values propagate from the view (view -> model).
  */
  registerOnChange(fn: any): void {
      this.onModelChange = fn;
  }

 /*
  * Registers a callback function that should be called when the control receives
  * a blur event.
  *
  * This is called by the forms API on initialization so it can update the form model
  * on blur.
  */
  registerOnTouched(fn: any): void {
      this.onModelTouched = fn;
  }

 /**
  * This function is called by the forms API when the control status changes to
  * or from "DISABLED". Depending on the value, it should enable or disable the
  * appropriate DOM element.
  */
  setDisabledState(isDisabled: boolean): void {
      this.disabled = isDisabled;
  }
}
