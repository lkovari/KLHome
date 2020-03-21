import { Component, OnInit, Input, Output, EventEmitter, ViewChild, RendererFactory2, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputMask } from 'primeng';

@Component({
  selector: 'app-custom-input-mask',
  templateUrl: './custom-input-mask.component.html',
  styleUrls: ['./custom-input-mask.component.scss'],
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: CustomInputMaskComponent, multi: true } ]
})
export class CustomInputMaskComponent implements OnInit, ControlValueAccessor  {
  private _value: string;
  @Input()
  set value(v: string) {
      this._value = v;
  }
  get value() {
      return this._value;
  }
  private _maskText: string;
  @Input()
  set maskText(v: string) {
    this._maskText = v;
  }
  get maskText(): string {
    return this._maskText;
  }
  private _placeHolderText: string;
  @Input()
  set placeHolderText(v: string) {
    this._placeHolderText = v;
  }
  get placeHolderText(): string {
    return this._placeHolderText;
  }
  @Input() tabindex: number;
  @Input() disabled: boolean;
  @Input() name: string;
  @Input() id: string;
  @Input() style: string;
  @Input() styleClass: string;
  private _isRequired = false;
  @Input()
  set isRequired(v: boolean) {
    // this._isRequired = v != null && `${v}` !== 'false';
    this._isRequired = v;
  }
  get isRequired(): boolean {
    return this._isRequired;
  }
  private _requiredMessage: string;
  @Input()
  set requiredMessage(v: string) {
    this._requiredMessage = v;
  }
  get requiredMessage() {
    return this._requiredMessage;
  }
  @Output() onChangeEvent = new EventEmitter<any>();
  @Output() onBlurEvent = new EventEmitter<any>();
  @ViewChild('inputMask', { static: true }) customInputMask: InputMask;
  private _renderer: Renderer2;

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(rendererFactory: RendererFactory2) {
    this._renderer = rendererFactory.createRenderer(null, null);
  }

  private updateUI() {
    if (this.customInputMask && this.customInputMask.inputViewChild.nativeElement) {
      if (this._value === undefined || this._value === null) {
        this.customInputMask.inputViewChild.nativeElement.value = '';
      } else {
        this.customInputMask.inputViewChild.nativeElement.value = this._value;
      }
    }
  }

  // required for ControlValueAccessor implementation
  writeValue(value: any): void {
      this._value = value;
      this.onModelTouched();
      this.onModelChange(this._value);
      this.updateUI();
  }

  // required for ControlValueAccessor implementation
  registerOnChange(fn: Function): void {
      this.onModelChange = fn;
  }

  // required for ControlValueAccessor implementation
  registerOnTouched(fn: Function): void {
      this.onModelTouched = fn;
  }

    /**
     * Function that is called by the forms API when the control status changes to or from 'DISABLED'.
     * Depending on the status, it enables or disables the appropriate DOM element.
     * @param isDisabled
     */
    setDisabledState(isDisabled: boolean) {
      // prevent exception
      this._renderer.setProperty(this.customInputMask.inputViewChild.nativeElement, 'disabled', isDisabled);
    }

  ngOnInit() {
  }

  private highestIndex(input) {
    const numarray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let highestIndex = '0';
    numarray.forEach((item) => {
      const val = input.lastIndexOf(item);
      if (val >= highestIndex) {
          highestIndex = val;
      }
    });
    // console.log(high);
    return highestIndex + 1;
  }

  onkeydown(event) {
      const eventValue = event.target.value;
      const highestIndex = this.highestIndex(eventValue);
      const caretPos = eventValue.indexOf('_');
      if (event.target.selectionStart > highestIndex) {
          event.target.setSelectionRange(caretPos, caretPos);
      }
      this.onModelTouched();
  }

  onComplete(event: any) {
    this.onModelTouched();
    this.onModelChange(this._value);
    this.onChangeEvent.emit(this._value);
    console.log('onComplete event fired ' + event);
  }

  onBlur(event: any) {
      this.onBlurEvent.emit(this._value);
      this.onModelTouched();
      this.onModelChange(this._value);
      console.log('onBlur event fired ' + event);
  }

}
