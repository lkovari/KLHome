import { Component, OnInit } from '@angular/core';
import { FormGroupDirective, FormBuilder, FormGroup, ControlContainer, Validator, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: FormGroupDirective } ]
})
export class AddressComponent implements OnInit {
  isDisabled = false;
  private addressFormGroup: FormGroup;
  private parentForm
  constructor(private formGroupDirective: FormGroupDirective, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const updateOnObj = { updateOn: 'submit' };
    this.addressFormGroup = this.formBuilder.group( {
      addressLine1 : [ { value: null, disabled: this.isDisabled }, [ Validators.required ] ],
      addressLine2 : [ { value: null, disabled: this.isDisabled } ],
      city : [ { value: null, disabled: this.isDisabled }, [ Validators.required, Validators.minLength(3), Validators.maxLength(48) ] ],
      zip : [ { value: null, disabled: this.isDisabled }, [ Validators.minLength(5), Validators.maxLength(10) ] ]
    }, updateOnObj );
    this.parentForm = this.formGroupDirective.form;
    this.parentForm.addControl('address', this.addressFormGroup);
  }

  extractFormControl(controlName: string): FormControl {
    const fc = this.addressFormGroup.get(controlName);
    return <FormControl>fc;
  }

}
