import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IAddress } from '../../../shared/components/address/address.interface';
import { AddressModel } from '../../../shared/components/address/address.model';

@Component({
  selector: 'app-angular-page-content4',
  templateUrl: './angular-page-content4.component.html',
  styleUrls: ['./angular-page-content4.component.scss']
})
export class AngularPageContent4Component implements OnInit {
  isSubmitted = false;
  githubLogoPath: string;
  exampleForm: FormGroup;
  address: IAddress;
  formControlStatusKeys = ['status', 'dirty', 'pristine', 'touched', 'untouched', 'valid', 'invalid', 'value', 'errors'];
  form_data = {
    address: {
      addressLine1: '',
      addressLine2: '',
      city: '',
      zip: ''
    }
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.exampleForm = this.formBuilder.group([]);
    this.githubLogoPath = 'assets/images/GitHub-Mark-32px.png';
  }

  private getSampleModel(): IAddress {
    const addressModel = new AddressModel();
    addressModel.addressLine1 = '#12/b Tóth Árpád street';
    addressModel.addressLine2 = '';
    addressModel.city = 'Budapest';
    addressModel.zip = 'H-1183';
    return addressModel;
  }

  onSetModel(exampleForm) {
    this.exampleForm.setValue(
    {
      address: this.getSampleModel(),
    });
    // with proper values the form valid
    this.exampleForm.get('address').markAsDirty();
    this.exampleForm.get('address').markAsTouched();
    this.exampleForm.get('address').setErrors(null);
    this.exampleForm.markAsDirty();
    this.exampleForm.markAsTouched();
    this.exampleForm.setErrors(null);
  }

  onClearModel(form) {
    this.exampleForm.patchValue(
      {
        address: {
          addressLine1: null,
          addressLine2: null,
          city: null,
          zip: null
        },
      }
    );
    this.exampleForm.get('address').markAsPristine();
    this.exampleForm.get('address').markAsUntouched();
    this.exampleForm.markAsPristine();
    this.exampleForm.markAsUntouched();
    this.isSubmitted = false;
  }

  extractFormControl(): FormControl {
    return <FormControl>this.exampleForm.get('address');
  }

  extractFormControlValueByKey(key: string): FormControl {
    return <FormControl>this.exampleForm.get('address')[key];
  }

  extractFormGroupValueByKey(key: string): FormControl {
    return <FormControl>this.exampleForm[key];
  }

  iskeyValue(key: string) {
    return key === 'value';
  }

  iskeyErrors(key: string) {
    return key === 'errors';
  }

  onSubmit(form: FormGroup) {
    this.isSubmitted = true;
    this.form_data = form.value;
    console.log(form);
  }
}
