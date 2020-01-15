import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-display-form-state',
  templateUrl: './display-form-state.component.html',
  styleUrls: ['./display-form-state.component.scss']
})
export class DisplayFormStateComponent implements OnInit {
  formControlStatusKeys = ['type', 'status', 'valid', 'invalid', 'pending', 'pristine', 'dirty', 'touched', 'untouched', 'value'];

  private _mainFormGroup: FormGroup;
  @Input()
  set mainFormGroup(v: FormGroup) {
    this._mainFormGroup = v;
  }
  get mainFormGroup(): FormGroup {
    return this._mainFormGroup;
  }
  controlList = new Array<FormControl>();
  formGroupStack = [];

  constructor() { }

  ngOnInit() {
  }

  /*
  extractFormGroupValueByKey(key: string): FormControl {
    return <FormControl>this.mainFormGroup[key];
  }
  */
  extractFormGroupPropertyValueByKey(key: string): string {
    console.log('FormGroup property value key ' + `${key}`);
    return this.mainFormGroup[key];
  }

  isComplexControl(ctrl: AbstractControl): boolean {
    return (ctrl instanceof FormGroup) || (ctrl instanceof FormArray);
  }

  extractFormControls(): Array<FormControl> {
    this.controlList = [];
    Object.keys( this.mainFormGroup.controls).forEach(key => {
      this.controlList.push(<FormControl>this.mainFormGroup.controls[key]);
    });
    return this.controlList;
  }

  extractFormControlKeys(): string[] {
    let formControlKey = [];
    if (this.mainFormGroup && this.mainFormGroup.controls) {
      formControlKey = Object.keys(this.mainFormGroup.controls);
    }
    return formControlKey;
  }

  composeObjectName(ctrlKey: string, v: any): string {
    return ctrlKey + ' : ' + v;
  }

  extractFormElementByKey(ctrlKey: string): FormControl | FormGroup | FormArray {
    let control = this.mainFormGroup.controls[ctrlKey];
    console.log('key ' + `${ctrlKey}`);
    if (control instanceof FormControl) {
      control = <FormControl>control;
    } else if (control instanceof FormGroup) {
      control = <FormGroup>control;
    } else  if (control instanceof FormArray) {
      control = <FormArray>control;
    }
    return <FormControl | FormGroup | FormArray>control;
  }

  extractFormGroupElementByKey(ctrlKey): FormGroup {
    let control = this.mainFormGroup.controls[ctrlKey];
    return control = <FormGroup>control;
  }

  extractFormControlValueByKey(ctrl: FormControl, key: string): any {
    return ctrl[key];
  }

  isValueOk(v: string): boolean {
    return v === 'VALID';
  }

  extractType(control: AbstractControl): string {
    let typeName = null;
    if (control instanceof FormControl) {
      typeName = 'FormControl';
    } else if (control instanceof FormGroup) {
      typeName = 'FormGroup';
    } else if (control instanceof FormArray) {
      typeName = 'FormArray';
    }
    return typeName;
  }

  getStyleColor(k: string, v: any): string {
    let color = 'black';
    if ((k === 'status' && v === 'VALID') || (k === 'valid' && v) || (k === 'invalid' && !v)) {
      color = 'green';
    } else if ((k === 'status' && v === 'INVALID') || (k === 'valid' && !v) || (k === 'invalid' && v)) {
      color = 'red';
    } else if (k === 'errors' && v !== null) {
      color = 'red';
    } else if (v instanceof Object) {
      color = 'blue';
    }
    return color;
  }

  extractFormName(control: AbstractControl): string | null {
    let group = null;
    if (!(control instanceof FormGroup)) {
      return null;
    } else {
      group = <FormGroup>control;
    }
    let name: string;
    Object.keys(group.controls).forEach(key => {
      const childControl = group.get(key);
      if (childControl !== control) {
        return;
      }
      name = key;
    });
    return name;
  }

  isItComplexObject(complexCtrl: AbstractControl): boolean {
    return complexCtrl instanceof FormGroup || complexCtrl instanceof FormArray;
  }

  onComplexControlClicked(complexCtrl: FormGroup) {
    this.formGroupStack.push(this._mainFormGroup);
    this._mainFormGroup = complexCtrl;
  }

  isEnableBackButton(): boolean {
    return this.formGroupStack.length > 0;
  }

  onBackClicked(event) {
    this._mainFormGroup = this.formGroupStack.pop();
  }
}
