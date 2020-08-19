/**
 * Created by Laszlo Kovary on 2018.02.08.
 */
import { Component, EventEmitter, OnInit, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl, NgModel, ValidationErrors } from '@angular/forms';

@Component({
    selector: 'app-custom-calendar',
    templateUrl: './custom-calendar.component.html',
    styleUrls: ['./custom-calendar.component.scss'],
    providers: [
        {    provide: NG_VALUE_ACCESSOR, useExisting: CustomCalendarComponent, multi: true },
        {    provide: NG_VALIDATORS, useExisting: CustomCalendarComponent, multi: true }
    ]
})
export class CustomCalendarComponent implements OnInit, ControlValueAccessor, Validator {
    @Input() disabledDays = new Array<number>();
    @Input() disabledDates = new Array<Date>();
    @Input() defaultDate = null;
    @Input() disabled = false;
    @Input() showOnFocus = true;
    @Input() showIcon: boolean;
    @Input() required = false;
    @Input() selectOtherMonths = true;
    @Input() showButtonBar = true;
    @Input() monthNavigator = false;
    @Input() showTime = false;
    @Input() timeOnly = false;
    @Input() showSeconds = false;
    @Input() keepInvalid = false;
    @Input() autoZIndex = true;
    @Input() inline = false;
    @Input() inputId: string;
    @Input() todayButtonStyleClass: string;
    @Input() clearButtonStyleClass: string;
    @Input() selectionMode = 'single';
    @Input() style: string;
    @Input() styleClass: string;
    @Input() hourFormat = '24';
    @Input() dateFormat = 'mm/dd/yy';
    @Input() appendTo = null;
    @Output() onTodayClicked = new EventEmitter<Date | null>();
    @Output() onDateSelected = new EventEmitter<Date | null>();
    @Output() onClearClicked = new EventEmitter<Date | null>();
    @Output() onModelChanged = new EventEmitter<Date | null>();
    @ViewChild('Model', { static: true }) calendarModel: NgModel;
    private _date: Date | null;
    private _yearRange;
    private _yearNavigator = false;
    private _minDate: Date;
    private _maxDate: Date;
    private _name: string;
    @Input()
    get yearNavigator(): boolean {
        return this._yearNavigator;
    }
    set yearNavigator(v: boolean) {
        this._yearNavigator = v;
    }
    @Input()
    get yearRange(): string {
        return this._yearRange;
    }
    set yearRange(v: string) {
        this._yearRange = v;
    }
    @Input()
    get minDate(): Date {
        return this._minDate;
    }
    set minDate(v: Date) {
        this._minDate = v;
    }
    @Input()
    get maxDate(): Date {
        return this._maxDate;
    }
    set maxDate(v: Date) {
        this._maxDate = v;
    }

    get date(): Date | null {
        return this._date;
    }
    set date(date: Date | null) {
        this._date = date;
    }
    get name() {
        return this._name;
    }
    set name(name: string) {
        this._name = name;
    }

    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    constructor() {
    }

    ngOnInit() {
    }


    onSelect(value: any) {
        this.onModelTouched();
        this.onModelChange(value);
        if (value instanceof Date) {
            this.onDateSelected.emit(<Date>value);
        } else if (value instanceof String) {
            const dateAsString = <string>value;
            this.onDateSelected.emit(new Date(Date.parse(dateAsString)));
        }
        console.log('onSelect event fired ' + value);
    }

    onTodayClick(date: any) {
        this.onModelTouched();
        this.onModelChange(date);
        this.onTodayClicked.emit(date);
    }
    onClearClick(event: MouseEvent) {
        this.onModelTouched();
        this.onModelChange(null);
        this.onClearClicked.emit(null);
        console.log('onClearClick click event fired ' + event);
    }

    onNgModelChange(date: any) {
        this.onModelTouched();
        this.onModelChange(date);
        this.onModelChanged.emit(date);
    }

    validate(c: FormControl): ValidationErrors | null {
        const validationResult: ValidationErrors = {};
        if (c.value) {
            let valueAsDate;
            if (typeof(c.value) === 'string' ) {
                valueAsDate = new Date(Date.parse(c.value));
            } else {
                valueAsDate = <Date>c.value;
            }
            if (this.minDate) {
                if (valueAsDate < this.minDate) {
                    this._date = null;
                    this.onModelChange(this._date);
                    validationResult.minDate = {
                        invalid: true
                    }
                }
            }
            if (this.maxDate) {
                if (valueAsDate > this.maxDate) {
                    this._date = null;
                    this.onModelChange(this._date);
                    validationResult.maxdate.invalid = true;
                }
            }
        }
        return validationResult;
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
