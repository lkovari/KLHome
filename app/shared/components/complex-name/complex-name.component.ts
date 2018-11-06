import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { IComplexName } from './complex-name-interface';
import {
  FormGroup, FormControl, FormBuilder, Validators, ControlValueAccessor,
  NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ValidationErrors, AbstractControl
} from '@angular/forms';
import { IComplexNameConfig } from './complex-name-config.interface';
import { ComplexNameConfig } from './complex-name-config.model';
import { ComplexName } from './complex-name.model';
import { ValidationPlaceKind } from './validation-place-kind';

@Component({
  selector: 'app-complex-name',
  templateUrl: './complex-name.component.html',
  styleUrls: ['./complex-name.component.scss'],
  providers: [ { provide: NG_VALUE_ACCESSOR, useExisting: ComplexNameComponent, multi: true},
               { provide: NG_VALIDATORS, useExisting: ComplexNameComponent, multi: true} ]
})
export class ComplexNameComponent implements OnInit, ControlValueAccessor, Validator {
  complexNameForm: FormGroup;
  private _cleanup = false;
  @Input()
  get cleanup(): boolean {
    return this._cleanup;
  }
  set cleanup(v: boolean) {
    this._cleanup = v;
    if (this._cleanup) {
      try {
        this.cleanupFields();
      }
      finally {
        this._cleanup = false;
      }
    }
  }
  @Input() config: IComplexNameConfig;
  @Input() disabled = false;
  @Output() onNameChange = new EventEmitter<IComplexName>();
  @Output() onFirstNameChange = new EventEmitter<string>();
  @Output() onMiddleInitialChange = new EventEmitter<string>();
  @Output() onLastNameChange = new EventEmitter<string>();
  isDisabled = false;

  private firstNameValidators = [];
  private lastNameValidators = [];

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(private fb: FormBuilder) { }

  private cleanupFields() {
    if (this.complexNameForm) {
      Object.keys(this.complexNameForm.controls).forEach(key => {
        this.complexNameForm.controls[key].markAsPristine();
        this.complexNameForm.controls[key].markAsUntouched();
        this.complexNameForm.controls[key].setErrors({firstNameRquired: {invalid: true}, lastNameRequired: {invalid: true}});
      });
    }
  }

  private setupConfig() {
    this.config = new ComplexNameConfig();
    this.config.firstNameMaxLength = 25;
    this.config.firstNameMinLength = 3;
    this.config.isFirstNameMandatory = true;
    this.config.lastNameMaxLength = 25;
    this.config.lastNameMinLength = 3;
    this.config.isLastNameMandatory = true;
    this.config.isShowDoneInside = false;
    this.config.isUpdateOnBlur = false;
    this.config.validationPlaceKind = ValidationPlaceKind.Inside;
  }

  private setupValidatorsByConfig(config: IComplexNameConfig) {
    if (config) {
      this.firstNameValidators = [];
      if (config.isFirstNameMandatory) {
        this.firstNameValidators.push(Validators.required);
      }
      if (config.firstNameMinLength) {
        this.firstNameValidators.push(Validators.minLength(config.firstNameMinLength));
      }
      if (config.firstNameMaxLength) {
        this.firstNameValidators.push(Validators.maxLength(config.firstNameMaxLength));
      }
      const firstNameFormControl = this.complexNameForm.get('firstName');
      firstNameFormControl.setValidators(this.firstNameValidators);
      firstNameFormControl.updateValueAndValidity();
      this.lastNameValidators = [];
      if (config.isLastNameMandatory) {
        this.lastNameValidators.push(Validators.required);
      }
      if (config.lastNameMinLength) {
        this.lastNameValidators.push(Validators.minLength(config.lastNameMinLength));
      }
      if (config.lastNameMaxLength) {
        this.lastNameValidators.push(Validators.maxLength(config.lastNameMaxLength));
      }
      const lastNameFormControl = this.complexNameForm.get('lastName');
      lastNameFormControl.setValidators(this.lastNameValidators);
      lastNameFormControl.updateValueAndValidity();
    } else {
      throw new Error('Configuration not defined!');
    }

  }

  ngOnInit() {
    let updateOnObj = null;
    if (this.config) {
      if (this.config.isUpdateOnBlur) {
        updateOnObj = { updateOn: 'blur' };
      } else {
        updateOnObj = { updateOn: 'submit' };
      }
    }
    // create reactive form with FormBuilder
    this.complexNameForm = this.fb.group({
      firstName: [{ value: null, disabled: this.isDisabled }],
      middleInitial: [{ value: null, disabled: this.isDisabled }, [Validators.maxLength(3)]],
      lastName: [{ value: null, disabled: this.isDisabled }]
      // title not created
    }, updateOnObj);
    // set the validators dinamically based on the config class
    this.setupValidatorsByConfig(this.config);
    // observing status changes
    this.complexNameForm.get('firstName').statusChanges.subscribe((obj: any) => {
      console.log('First name status changed ' + JSON.stringify(obj));
    });
    this.complexNameForm.get('middleInitial').statusChanges.subscribe((obj: any) => {
      console.log('MiddleInitial name status changed ' + JSON.stringify(obj));
    });
    this.complexNameForm.get('lastName').statusChanges.subscribe((obj: any) => {
      console.log('Last name status changed ' + JSON.stringify(obj));
    });
    // observing model changes
    this.complexNameForm.get('firstName').valueChanges.subscribe((value: string) => {
      this.onFirstNameChange.emit(value);
    });
    this.complexNameForm.get('middleInitial').valueChanges.subscribe((value: string) => {
      this.onMiddleInitialChange.emit(value);
    });
    this.complexNameForm.get('lastName').valueChanges.subscribe((value: string) => {
      this.onLastNameChange.emit(value);
    });
    this.complexNameForm.valueChanges.subscribe((value: any) => {
      this.handleValueChanges(value);
    });
  }

  private handleValueChanges(value: any) {
    this.onModelChange(value);
    this.onModelTouched();
    this.onNameChange.emit(value);
  }

  isValidationPlaceInsideComponent(): boolean {
    let isInside = true;
    if (this.config) {
      isInside = this.config.validationPlaceKind === ValidationPlaceKind.Inside;
    }
    return isInside;
  }

  isShowDoneInside() {
    return this.config && this.config.isShowDoneInside;
  }

  extractFormControl(controlName: string): FormControl {
    const fc = this.complexNameForm.get(controlName);
    return <FormControl>fc;
  }

  onDone(form: FormGroup) {
    console.log('onDone ' + JSON.stringify(this.complexNameForm.value));
  }

  /*
   * Writes a new value to the element.
   *
   * This method will be called by the forms API to write to the view when programmatic
   * (model -> view) changes are requested.
   */
  writeValue(obj: any): void {
    if (obj) {
      this.complexNameForm.patchValue(obj);
    } else {
      this.complexNameForm.setValue(new ComplexName());
    }
  }

  /*
   * Registers a callback function that should be called when the control's value
   * changes in the UI.
   *
   * This is called by the forms API on initialization so it can update the form
   * model when values propagate from the view (view -> model).
   */
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  /*
   * Registers a callback function that should be called when the control receives
   * a blur event.
   *
   * This is called by the forms API on initialization so it can update the form model
   * on blur.
   */
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }

  /**
   * This function is called by the forms API when the control status changes to
   * or from "DISABLED". Depending on the value, it should enable or disable the
   * appropriate DOM element.
   */
  setDisabledState(value: boolean): void {
    this.disabled = value;
  }

  validate(c: FormControl): ValidationErrors | null {
    let validationResult = null;
    if (c.value) {
      const complexNameValue = c.value;
      if (this.config.firstNameMinLength) {
        if (complexNameValue.firstName) {
          if (complexNameValue.firstName.length < this.config.firstNameMinLength) {
            if (validationResult !== null) {
              validationResult.firstNameMinLength = {
                invalid: true
              }
            } else {
              validationResult = {
                firstNameMinLength: {
                  invalid: true
                }
              }
            }
          }
        }
      }
      if (this.config.firstNameMaxLength) {
        if (complexNameValue.firstName) {
          if (complexNameValue.firstName.length > this.config.firstNameMaxLength) {
            if (validationResult !== null) {
              validationResult.firstNameMaxLength = {
                invalid: true
              }
            } else {
              validationResult = {
                firstNameMaxLength: {
                  invalid: true
                }
              }
            }
          }
        }
      }
      if (this.config.isFirstNameMandatory) {
        if (!complexNameValue.firstName) {
          if (validationResult !== null) {
            validationResult.firstNameRequired = {
              invalid: true
            }
          } else {
            validationResult = {
              firstNameRequired: {
                invalid: true
              }
            }
          }
        }
      }
      if (this.config.lastNameMinLength) {
        if (complexNameValue.lastName) {
          if (complexNameValue.lastName.length < this.config.lastNameMinLength) {
            if (validationResult !== null) {
              validationResult.lastNameMinLength = {
                invalid: true
              }
            } else {
              validationResult = {
                lastNameMinLength: {
                  invalid: true
                }
              }
            }
            // this.nameModel.last = null;
          }
        }
      }
      if (this.config.lastNameMaxLength) {
        if (complexNameValue.lastName) {
          if (complexNameValue.lastName.length > this.config.lastNameMaxLength) {
            if (validationResult !== null) {
              validationResult.lastNameMaxLength = {
                invalid: true
              }
            } else {
              validationResult = {
                lastNameMaxLength: {
                  invalid: true
                }
              }
            }
            // this.nameModel.last = null;
          }
        }
      }
      if (this.config.isLastNameMandatory) {
        if (!complexNameValue.lastName) {
          if (validationResult !== null) {
            validationResult.lastNameRequired = {
              invalid: true
            }
          } else {
            validationResult = {
              lastNameRequired: {
                invalid: true
              }
            }
          }
        }
      }
    } else {
      console.warn('Model is not initialized!');
    }
    console.warn('ValidationResult ' + JSON.stringify(validationResult));
    return validationResult;
  }
}
