import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IUser } from './user.interface';
import { User } from './user.model';

@Component({
  selector: 'app-angular-page-content1',
  templateUrl: './angular-page-content1.component.html',
  styleUrls: ['./angular-page-content1.component.scss']
})
export class AngularPageContent1Component implements OnInit {
  user: IUser;
  userNameMinLength = 5;
  userNameMaxLength = 20;
  // originated from : https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204
  usPhoneNumberPattern = '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$';
  submittedFormData: any;
  githubLogoPath: string;
  @ViewChild('dataEntryForm', {static: true} ) dataEntryForm: NgForm;

  constructor() { }

  ngOnInit() {
    this.user = new User();
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
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
    this.submittedFormData = undefined;
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
    this.submittedFormData = undefined;
  }

  getDataEntryForm(): NgForm {
    return this.dataEntryForm;
  }

  onSubmit(userForm: NgForm) {
    this.submittedFormData = userForm.value;
    console.log(this.dataEntryForm);
  }
}
