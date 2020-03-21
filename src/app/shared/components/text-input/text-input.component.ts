/**
 * Created by lkovari on 2018.02.08.
 */
import { Component, OnInit, ElementRef, forwardRef, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl } from '@angular/forms';

export const TEXT_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextInputComponent),
  multi: true
};

export const TEXT_INPUT_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => TextInputComponent),
  multi: true
};

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [TEXT_INPUT_VALUE_ACCESSOR, TEXT_INPUT_VALIDATOR]
})
export class TextInputComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() required: boolean;
  private _value: string;
  @Input()
  get value(): string {
    return this._value;
  }
  set value(v: string) {
    this._value = v;
  }
  private _disabled: boolean;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(v: boolean) {
    this._disabled = v;
  }
  private _name: string;
  @Input()
  get name(): string {
    return this._name;
  }
  set name(nm: string) {
    this._name = nm;
  }
  private _size: number;
  @Input()
  get size(): number {
    return this._size;
  }
  set size(v: number) {
    this._size = v;
  }
  private _capital = false;
  @Input()
  get capital(): boolean {
    return this._capital;
  }
  set capital(v: boolean) {
    this._capital = v;
  }
  private _minLength: number;
  @Input()
  get minlength(): number {
    return this._minLength;
  }
  set minlength(v: number) {
    this._minLength = v;
  }
  @Output() onChanged = new EventEmitter<String>();
  @Output() onBlur = new EventEmitter<String>();
  @ViewChild('in', { static: true }) input: ElementRef;

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor() { }

  ngOnInit() {
  }

  private updateInput() {
    if (this.input && this.input.nativeElement) {
      if (this._value === undefined || this._value === null) {
        this.input.nativeElement.value = '';
      } else {
        this.input.nativeElement.value = this._value;
      }
    }
  }

  onClick(event: MouseEvent) {
    this.onModelTouched();
    console.log('onClick click event fired ' + event);
  }

  onKeyUp(event) {
    this.onModelChange(event.currentTarget.value);
    this.onModelTouched();
    this.onChanged.emit(event);
  }

  onChange(event) {
    this.onModelChange(event.currentTarget.value);
    this.onModelTouched();
    this.onChanged.emit(event);
  }

  focusLost(event) {
    this.onModelChange(event.currentTarget.value);
    this.onModelTouched();
    this.onBlur.emit(event);
  }

  writeValue(value: string): void {
    if (value !== this._value) {
      this._value = value;
      this.updateInput();
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  validate(c: FormControl) {
    let validationResult = null;
    if (c.value) {
      if (this._capital) {
        if (!(c.value.charCodeAt(0) >= 65 && c.value.charCodeAt(0) <= 90)) {
          validationResult = {
            capital: {
              invalid: true
            }
          };
        }
      }
      if (this._minLength > 0) {
        if (c.value.length < this._minLength) {
          if (validationResult !== null) {
            validationResult.minlength = {
              invalid: true
            }
          } else {
            validationResult = {
              minlength: {
                invalid: true
              }
            };
          }
        }
      }
    }
    return validationResult;
  }
}
