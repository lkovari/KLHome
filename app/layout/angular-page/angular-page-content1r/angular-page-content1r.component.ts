import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { IUser } from '../angular-page-content1/user.interface';
import { User } from '../angular-page-content1/user.model';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-angular-page-content1r',
  templateUrl: './angular-page-content1r.component.html',
  styleUrls: ['./angular-page-content1r.component.scss']
})
export class AngularPageContent1rComponent implements OnInit {
  formValue: any;
  user: IUser;
  userNameMinLength = 5;
  userNameMaxLength = 20;
  // originated from : https://www.sitepoint.com/community/t/phone-number-regular-expression-validation/2204
  usPhoneNumberPattern = '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$';
  submittedFormData: any;
  githubLogoPath: string;
  dataEntryForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.user = new User();
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.dataEntryForm = this.formBuilder.group({
      'userName': [ null, [
        Validators.required, Validators.minLength(this.userNameMinLength),
        Validators.maxLength(this.userNameMaxLength), CustomValidators.FirstCharIsCapitalLetter
      ] ],
      'email': [null, [Validators.required, Validators.email] ],
      'phone': [null, [Validators.required, Validators.pattern(this.usPhoneNumberPattern)] ]
    });
    /* conventional
    this.dataEntryForm = new FormGroup({
      'userName': new FormControl(null, [
        Validators.required, Validators.minLength(this.userNameMinLength),
        Validators.maxLength(this.userNameMaxLength), CustomValidators.FirstCharIsCapitalLetter
      ] ),
      'email': new FormControl(null, [Validators.required, Validators.email] ),
      'phone': new FormControl(null, [Validators.required, Validators.pattern(this.usPhoneNumberPattern)])
    });
    */
    // with FormBuilder
    this.dataEntryForm.valueChanges.subscribe(
      value => this.onValueChanged(value)
    );
  }

  onValueChanged(formValue) {
    this.formValue = formValue;
    console.log(this.formValue);
  }

  setValues(form: FormGroup) {
    this.dataEntryForm.setValue(
      // this.dataEntryForm.form.patchValue(
      {
        userName: 'lkovary',
        email: 'laszlo.kovary@gmail.com',
        phone: '800 1234 5678'
      }
    );
    Object.keys( this.dataEntryForm.controls).forEach(key => {
      this.dataEntryForm.controls[key].markAsDirty();
      this.dataEntryForm.controls[key].markAsTouched();
    });
    this.submittedFormData = undefined;
    console.log('setValues Click event fired ' + form.status);
  }

  clearValues(form: FormGroup) {
    this.dataEntryForm.setValue(
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
    console.log('clearValues Click event fired ' + form.status);
  }

  onSubmit() {
    this.submittedFormData = this.dataEntryForm.value;
    console.log(this.dataEntryForm.value);
  }
}
