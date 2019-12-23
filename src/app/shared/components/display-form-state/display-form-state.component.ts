import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-form-state',
  templateUrl: './display-form-state.component.html',
  styleUrls: ['./display-form-state.component.scss']
})
export class DisplayFormStateComponent implements OnInit {
  formControlStatusKeys = ['status', 'valid', 'invalid', 'pending', 'pristine', 'dirty', 'touched', 'untouched', 'value'];

  private _dataEntryForm: NgForm;
  @Input()
  set dataEntryForm(v: NgForm) {
    this._dataEntryForm = v;
  }
  get dataEntryForm(): NgForm {
    return this._dataEntryForm;
  }

  controlList = new Array<FormControl>();

  constructor() { }

  ngOnInit() {
  }

  /*
  extractFormGroupValueByKey(key: string): FormControl {
    return <FormControl>this.dataEntryForm[key];
  }
  */
 extractFormGroupValueByKey(key: string): string {
  return this.dataEntryForm[key];
 }

  extractFormControls(): Array<FormControl> {
    this.controlList = [];
    Object.keys( this.dataEntryForm.controls).forEach(key => {
      this.controlList.push(<FormControl>this.dataEntryForm.controls[key]);
    });
    return this.controlList;
  }

  extractFormControlKeys(): string[] {
    let formControlKey = [];
    if (this.dataEntryForm && this.dataEntryForm.controls) {
      formControlKey = Object.keys(this.dataEntryForm.controls);
    }
    return formControlKey;
  }

  extractFormControlByKey(key: string): FormControl {
    return <FormControl>this.dataEntryForm.controls[key];
  }

  extractFormControlValueByKey(ctrl: FormControl, key: string): any {
    return ctrl[key];
  }

  isValueOk(v: string): boolean {
    return v === 'VALID';
  }

  getStyleColor(k: string, v: string): string {
    let color = 'black';
    if ((k === 'status' && v === 'VALID') || (k === 'valid' && v) || (k === 'invalid' && !v)) {
      color = 'green';
    } else if ((k === 'status' && v === 'INVALID') || (k === 'valid' && !v) || (k === 'invalid' && v)) {
      color = 'red';
    } else if (k === 'errors' && v !== null) {
      color = 'red';
    }
    return color;
  }
}
