/**
 * Created by lkovari on 2018.02.08.
 */
import { Component, EventEmitter, OnInit, Input, Output, ViewChild, forwardRef, ExistingProvider } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, FormControl, NgModel } from '@angular/forms';

const CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomCalendarComponent),
    multi: true
};

export const CUSTOM_CALENDAR_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => CustomCalendarComponent),
    multi: true
};

@Component({
    selector: 'app-custom-calendar',
    templateUrl: './custom-calendar.component.html',
    styleUrls: ['./custom-calendar.component.scss'],
    providers: [CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR, CUSTOM_CALENDAR_VALIDATOR]
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
    private _yearNavigator = false;
    @Input()
    get yearNavigator(): boolean {
        return this._yearNavigator;
    }
    set yearNavigator(v: boolean) {
        this._yearNavigator = v;
    }
    @Input() monthNavigator = false;
    @Input() showTime = false;
    @Input() timeOnly = false;
    @Input() showSeconds = false;
    @Input() keepInvalid = false;
    @Input() autoZIndex = true;
    @Input() utc = false;
    @Input() inline = false;
    @Input() inputId: string;
    @Input() todayButtonStyleClass: string;
    @Input() clearButtonStyleClass: string;
    @Input() selectionMode = 'single';
    @Input() style: string;
    @Input() styleClass: string;
    @Input() hourFormat = '24';
    private _yearRange = null;
    @Input()
    get yearRange(): string {
        return this._yearRange;
    }
    set yearRange(v: string) {
        this._yearRange = v;
    }
    @Input() dateFormat = 'mm/dd/yy';
    @Input() appendTo = null;
    private _minDate: Date = null;
    @Input()
    get minDate(): Date {
        return this._minDate;
    }
    set minDate(v: Date) {
        this._minDate = v;
    }
    private _maxDate: Date = null;
    @Input()
    get maxDate(): Date {
        return this._maxDate;
    }
    set maxDate(v: Date) {
        this._maxDate = v;
    }

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
    @Output() onDateSelected = new EventEmitter<Date>();
    @Output() onClearClicked = new EventEmitter<Date>();
    @Output() onModelChanged = new EventEmitter<Date>();
    @ViewChild('Model', { static: true }) calendarModel: NgModel;

    onModelChange: Function = () => { };
    onModelTouched: Function = () => { };

    constructor() {
    }

    ngOnInit() {
    }


    onSelect(event) {
        this.onModelTouched();
        this.onModelChange(event);
        this.onDateSelected.emit(event);
    }

    onTodayClick(date: Date) {
        this.onModelTouched();
        this.onModelChange(date);
        this.onTodayClicked.emit(date);
    }
    onClearClick($event) {
        this.onModelTouched();
        this.onModelChange(null);
        this.onClearClicked.emit(null);
    }

    onNgModelChange(date: Date) {
        this.onModelTouched();
        this.onModelChange(date);
        this.onModelChanged.emit(date);
    }

    validate(c: FormControl) {
        let validationResult = null;
        if (c.value) {
            const valueAsDate = <Date>c.value;
            if (this.minDate) {
                if (valueAsDate < this.minDate) {
                    this._date = null;
                    this.onModelChange(this._date);
                    validationResult = {
                        mindate: {
                            invalid: true
                        }
                    }
                }
            }
            if (this.maxDate) {
                if (valueAsDate > this.maxDate) {
                    this._date = null;
                    this.onModelChange(this._date);
                    if (validationResult !== null) {
                        validationResult.maxdate = {
                            invalid: true
                        }
                    } else {
                        validationResult = {
                            maxdate: {
                                invalid: true
                            }
                        };
                    }
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
