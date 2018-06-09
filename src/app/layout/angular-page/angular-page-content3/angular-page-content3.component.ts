import { Component, OnInit, Self } from '@angular/core';
import { IComplexName } from '../../../shared/components/complex-name/complex-name-interface';
import { IComplexNameConfig } from '../../../shared/components/complex-name/complex-name-config.interface';
import { FormBuilder, FormGroup, NgControl, Validators, FormControl } from '@angular/forms';
import { ComplexName } from '../../../shared/components/complex-name/complex-name.model';
import { Jsonp } from '@angular/http';
import { ComplexNameConfig } from '../../../shared/components/complex-name/complex-name-config.model';
import { ValidationPlaceKind } from '../../../shared/components/complex-name/validation-place-kind';

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
    complexName: new ComplexName(),
    validationPlaceKind: ValidationPlaceKind.Inside
  };

  validationPlaceKindInside = ValidationPlaceKind.Inside;
  validationPlaceKindOutside = ValidationPlaceKind.Outside;

  constructor(private fb: FormBuilder) { }

  private setupConfig() {
    this.complexNameConfig = new ComplexNameConfig();
    this.complexNameConfig.firstNameMaxLength = 25;
    this.complexNameConfig.firstNameMinLength = 3;
    this.complexNameConfig.isFirstNameMandatory = true;
    this.complexNameConfig.lastNameMaxLength = 25;
    this.complexNameConfig.lastNameMinLength = 3;
    this.complexNameConfig.isLastNameMandatory = true;
    this.complexNameConfig.isShowTitle = false;
    this.complexNameConfig.validationPlaceKind = ValidationPlaceKind.Inside;
  }

  isConfigUpdateOnBlur(): boolean {
    return this.complexNameConfig && this.complexNameConfig.isUpdateOnBlur;
  }

  private setupModel() {
    this.complexNameModel = new ComplexName();
  }

  ngOnInit() {
    this.setupModel();
    this.setupConfig();
    this.exampleForm = this.fb.group({
      complexName: [this.complexNameModel],
      /*
      complexName: this.fb.group({
        firstName: '',
        middle: '',
        lastName: ''
      }),
      */
      validationPlaceKind: [this.complexNameConfig.validationPlaceKind, Validators.required]
    });
    // changed value into config
    this.exampleForm.get('validationPlaceKind').valueChanges.subscribe((value: ValidationPlaceKind) => {
      console.log('ValidationPlaceKind before calue changes ' + this.complexNameConfig.validationPlaceKind);
      this.complexNameConfig.validationPlaceKind = value;
      console.log('ValidationPlaceKind after value changes ' + this.complexNameConfig.validationPlaceKind);
    });
    this.githubLogoPath = 'assets/images/GitHub-Mark-32px.png';
  }

  onChange(model: IComplexName) {
    console.log(JSON.stringify(model));
  }

  isValidationPlaceInsideComponent(): boolean {
    let isInside = true;
    if (this.complexNameConfig) {
      isInside = this.complexNameConfig.validationPlaceKind === ValidationPlaceKind.Inside;
    }
    return isInside;
  }

  isValidationPlaceOutsideComponent(): boolean {
    let isOutside = false;
    if (this.complexNameConfig) {
      isOutside = this.complexNameConfig.validationPlaceKind === ValidationPlaceKind.Outside;
    }
    return isOutside;
  }

  private getSampleModel(): IComplexName {
    const complexNameModel = new ComplexName();
    complexNameModel.first = 'Jane';
    complexNameModel.middle = 'M';
    complexNameModel.last = 'Doe';
    complexNameModel.title = ''
    return complexNameModel;
  }

  private getEmptySampleModel(): IComplexName {
    const complexNameModel = new ComplexName();
    complexNameModel.first = '';
    complexNameModel.middle = '';
    complexNameModel.last = '';
    complexNameModel.title = ''
    return complexNameModel;
  }

  clearValues(form) {
    this.exampleForm.setValue(
      {
        complexName: this.getEmptySampleModel(),
        validationPlaceKind: ValidationPlaceKind.Inside
      }
    );
    Object.keys(this.exampleForm.controls).forEach(key => {
      this.exampleForm.controls[key].markAsPristine();
      this.exampleForm.controls[key].markAsUntouched();
    });
  }

  setValues(exampleForm) {
    this.exampleForm.setValue(
      {
        complexName: this.getSampleModel(),
        validationPlaceKind: this.complexNameConfig.validationPlaceKind
      });
    Object.keys(this.exampleForm.controls).forEach(key => {
      this.exampleForm.controls[key].markAsDirty();
      this.exampleForm.controls[key].markAsTouched();
    });
  }

  extractFormControl(): FormControl {
    const fc = this.exampleForm.get('complexName');
    return <FormControl>fc;
  }

  onSubmit(form: FormGroup) {
    this.submitted = true;
    this.form_data = form.value;
    console.log(form);
  }
}
