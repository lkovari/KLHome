/**
 * Created by lkovari on 2018.02.08.
 */
import {Component, EventEmitter, OnInit, Input, Output, ViewChild, NgModule, forwardRef, ExistingProvider} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl, NgModel } from '@angular/forms';
import {Calendar} from 'primeng/primeng';

const CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateCalendarComponent),
    multi: true
};


@Component({
    selector: 'app-date-calendar',
    templateUrl: './date-calendar.component.html',
    styleUrls: ['./date-calendar.component.scss'],
    providers: [CUSTOM_CALENDAR_CONTROL_VALUE_ACCESSOR]
})
export class DateCalendarComponent implements OnInit, ControlValueAccessor {
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

    /* ControlValueAccessor methods */
    writeValue(date: Date): void {
        this._date = date;
        // this.onModelTouched();
        // this.onModelChange(date);
    }

    registerOnChange(fn: any): void {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onModelTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
