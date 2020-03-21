import { Component, OnInit } from '@angular/core';
import { IComplexName } from '../../../shared/components/complex-name/complex-name-interface';
import { IComplexNameConfig } from '../../../shared/components/complex-name/complex-name-config.interface';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ComplexName } from '../../../shared/components/complex-name/complex-name.model';
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
  complexName: IComplexName;
  complexNameConfig: IComplexNameConfig;
  submitted = false;
  form_data = {
    complexName: new ComplexName(),
    validationPlaceKind: ValidationPlaceKind.Inside
  };

  validationPlaceKindInside = ValidationPlaceKind.Inside;
  validationPlaceKindOutside = ValidationPlaceKind.Outside;
  formControlStatusKeys = ['status', 'dirty', 'pristine', 'touched', 'untouched', 'valid', 'invalid', 'value', 'errors'];
  cleanup = false;

  constructor(private fb: FormBuilder) {}

  private setupConfig() {
    this.complexNameConfig = new ComplexNameConfig();
    this.complexNameConfig.firstNameMaxLength = 25;
    this.complexNameConfig.firstNameMinLength = 3;
    this.complexNameConfig.isFirstNameMandatory = true;
    this.complexNameConfig.lastNameMaxLength = 25;
    this.complexNameConfig.lastNameMinLength = 3;
    this.complexNameConfig.isLastNameMandatory = true;
    this.complexNameConfig.isShowDoneInside = false;
    // this.complexNameConfig.isUpdateOnBlur = false;
    this.complexNameConfig.validationPlaceKind = ValidationPlaceKind.Inside;
  }

  isConfigUpdateOnBlur(): boolean {
    return this.complexNameConfig && this.complexNameConfig.isUpdateOnBlur;
  }

  isShowDoneInside() {
    return this.complexNameConfig && this.complexNameConfig.isShowDoneInside;
  }

  private setupModel() {
    this.complexName = new ComplexName();
  }

  ngOnInit() {
    this.setupModel();
    this.setupConfig();
    this.exampleForm = this.fb.group({
      complexName: [this.complexName],
      validationPlaceKind: [this.complexNameConfig.validationPlaceKind, Validators.required]
    });
    // changed value into config
    this.exampleForm.get('validationPlaceKind').valueChanges.subscribe((value: ValidationPlaceKind) => {
      this.complexNameConfig.validationPlaceKind = value;
    });
    this.exampleForm.get('complexName').valueChanges.subscribe((value: IComplexName) => {
      console.log('ComplexName model changed ' + JSON.stringify(value));
    });
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
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
    complexNameModel.firstName = 'Jane';
    complexNameModel.middleInitial = 'M';
    complexNameModel.lastName = 'Doe';
    return complexNameModel;
  }

  /*
  private getEmptySampleModel(): IComplexName {
    const complexNameModel = new ComplexName();
    complexNameModel.firstName = null;
    complexNameModel.middleInitial = null;
    complexNameModel.lastName = null;
    return complexNameModel;
  }
  */

  onNameChange(model: IComplexName) {
    console.log('Model Changed ' + JSON.stringify(model));
  }

  onFirstNameChange(firstName: string) {
    console.log('First name Changed ' + firstName);
  }

  onMiddleInitialChange(middleInitial: string) {
    console.log('Middle Initial Changed ' + middleInitial);
  }

  onLastNameChange(lastName: string) {
    console.log('Last name Changed ' + lastName);
  }

  onClearModel(exampleForm: FormGroup) {
    this.exampleForm.patchValue(
      {
        complexName: new ComplexName(),
      }
    );
    // initiallize the component fields
    this.cleanup = true;
    setTimeout(() => {
      this.cleanup = false;
    }, 100)
    // initiallize the form (ComplexNameComponent)
    this.exampleForm.get('complexName').markAsPristine();
    this.exampleForm.get('complexName').markAsUntouched();
    this.exampleForm.markAsPristine();
    this.exampleForm.markAsUntouched();
    this.submitted = false;
    console.log('onClearModel click event fired ' + exampleForm.status);
  }

  onSetModel(exampleForm: FormGroup) {
    this.exampleForm.setValue(
    {
      complexName: this.getSampleModel(),
      validationPlaceKind: this.complexNameConfig.validationPlaceKind
    });
    // with proper values the form valid
    this.exampleForm.get('complexName').markAsDirty();
    this.exampleForm.get('complexName').markAsTouched();
    this.exampleForm.get('complexName').setErrors(null);
    this.exampleForm.markAsDirty();
    this.exampleForm.markAsTouched();
    this.exampleForm.setErrors(null);
    console.log('onSetModel click event fired ' + exampleForm.status);
  }

  extractFormControl(): FormControl {
    return <FormControl>this.exampleForm.get('complexName');
  }

  extractFormControlValueByKey(key: string): FormControl {
    return <FormControl>this.exampleForm.get('complexName')[key];
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
    this.submitted = true;
    this.form_data = form.value;
    console.log(form);
  }
}
