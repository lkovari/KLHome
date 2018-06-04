import { Component, OnInit, Self } from '@angular/core';
import { IComplexName } from '../../../shared/components/complex-name/complex-name-interface';
import { IComplexNameConfig } from '../../../shared/components/complex-name/complex-name-config.interface';
import { FormBuilder, FormGroup, NgControl, Validators, FormControl } from '@angular/forms';
import { ComplexName } from '../../../shared/components/complex-name/complex-name.model';
import { Jsonp } from '@angular/http';

@Component({
  selector: 'app-angular-page-content3',
  templateUrl: './angular-page-content3.component.html',
  styleUrls: ['./angular-page-content3.component.scss']
})
export class AngularPageContent3Component implements OnInit {
  githubLogoPath: string;
  exampleForm: FormGroup;
  complexNameModel: IComplexName;
  complexNameConfig: IComplexNameConfig;
  submitted = false;
  form_data = {
    complexName: new ComplexName()
  };

  constructor(private fb: FormBuilder /*, @Self() public controlDir: NgControl*/) {
    /*
    const control = this.controlDir.control;
    control.setValidators(Validators.required);
    control.updateValueAndValidity();
    */
  }

  isConfigUpdateOnBlur(): boolean {
    return this.complexNameConfig && this.complexNameConfig.isUpdateOnBlur;
  }
  private setupModel() {
    this.complexNameModel = new ComplexName();
  }

  ngOnInit() {
    this.setupModel();
    this.complexNameConfig = { 'firstNameMinLength': 3, 'firstNameMaxLength': 50, 'isFirstNameMandatory': true, 'lastNameMinLength': 3,
      'lastNameMaxLength': 50, 'isLastNameMandatory': true, 'isShowTitle': false, 'isUpdateOnBlur': false,
      'isShowValidationMessagesInside': false };
    this.exampleForm = this.fb.group({
      complexName: [this.complexNameModel]
    });
    this.githubLogoPath = 'assets/images/GitHub-Mark-32px.png';
  }

  onChange(model: IComplexName) {
    console.log(JSON.stringify(model));
  }

  clearValues(form) {
    this.exampleForm.setValue(
      {
        complexName: new ComplexName()
      }
    );
    Object.keys(this.exampleForm.controls).forEach(key => {
      this.exampleForm.controls[key].markAsPristine();
      this.exampleForm.controls[key].markAsUntouched();
    });
  }

  extractFormControl(): FormControl {
    const fc = this.exampleForm.get('complexName');
    return <FormControl>fc;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.form_data.complexName = this.exampleForm.value;
    // reset the form same as when reloaded
    console.log(this.exampleForm);
    // this.exampleForm.reset();
  }
}
