import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { IUser } from './user.interface';
import { User } from './user.model';

@Component({
  selector: 'app-angular-page-content1',
  templateUrl: './angular-page-content1.component.html',
  styleUrls: ['./angular-page-content1.component.scss']
})
export class AngularPageContent1Component implements OnInit {
  user: IUser;
  userNameMinLength = 3;
  userNameMaxLength = 30;
  // originated from : https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204
  usPhoneNumberPattern = '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$';
  formControlStatusKeys = ['status', 'dirty', 'pristine', 'touched', 'untouched', 'valid', 'invalid', 'value', 'errors'];
  submittedFormData: any;
  @ViewChild('dataEntryForm', {static: true} ) dataEntryForm: NgForm;

  constructor() { }

  ngOnInit() {
    this.user = new User();
  }

  extractFormGroupValueByKey(key: string): FormControl {
    return <FormControl>this.dataEntryForm[key];
  }

  iskeyValue(key: string) {
    return key === 'value';
  }

  iskeyErrors(key: string) {
    return key === 'errors';
  }

  setValues(form) {
    this.dataEntryForm.form.setValue(
      // this.dataEntryForm.form.patchValue(
      {
        userName: 'lkovari',
        email: 'lkovari@sisfirst.com',
        phone: '800 1234 5678'
      }
    );
    Object.keys( this.dataEntryForm.controls).forEach(key => {
      this.dataEntryForm.controls[key].markAsDirty();
      this.dataEntryForm.controls[key].markAsTouched();
    });
    /* we can use individually also
    (this.dataEntryForm.form.controls['pdropdown'] as FormControl).markAsDirty();
    */
  }

  clearValues(form) {
    this.dataEntryForm.form.setValue(
      {
        userName: null,
        email: null,
        phone: null
      }
    );
    Object.keys( this.dataEntryForm.controls).forEach(key => {
      this.dataEntryForm.controls[key].markAsPristine();
      this.dataEntryForm.controls[key].markAsUntouched();
    });
  }

  onSubmit(userForm: NgForm) {
    this.submittedFormData = userForm.value;
    // reset the form same as when reloaded
    this.dataEntryForm.reset();
    console.log(this.dataEntryForm);
  }
}
