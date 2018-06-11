import { Component, OnInit, Input, Output, EventEmitter, ExistingProvider, ViewChild, ElementRef, forwardRef, Self } from '@angular/core';
import { IComplexName } from './complex-name-interface';
import {
  FormGroup, FormControl, FormBuilder, Validators, ValidatorFn, ControlValueAccessor,
  NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, ValidationErrors, NgControl, FormGroupDirective
} from '@angular/forms';
import { IComplexNameConfig } from './complex-name-config.interface';
import { ComplexNameConfig } from './complex-name-config.model';
import { throwError } from 'rxjs';
import { ComplexName } from './complex-name.model';
import { ValidationPlaceKind } from './validation-place-kind';

const COMPLEX_NAME_CONTROL_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => ComplexNameComponent)
};

export const COMPLEX_NAME_CONTROL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => ComplexNameComponent),
  multi: true
};

@Component({
  selector: 'app-complex-name',
  templateUrl: './complex-name.component.html',
  styleUrls: ['./complex-name.component.scss'],
  providers: [COMPLEX_NAME_CONTROL_VALUE_ACCESSOR, COMPLEX_NAME_CONTROL_VALIDATOR]
})
export class ComplexNameComponent implements OnInit, ControlValueAccessor, Validator {
  complexNameForm: FormGroup;
  private _nameModel: IComplexName;
  @Input()
  get nameModel(): IComplexName {
    if (!this._nameModel) {
      this._nameModel = new ComplexName();
    }
    return this._nameModel;
  }
  set nameModel(v: IComplexName) {
    if (!v) {
      v = new ComplexName();
    }
    this._nameModel = v;
  }
  private _config: IComplexNameConfig;
  @Input()
  get config(): IComplexNameConfig {
    if (!this._config) {
      // this.setupConfig();
    }
    return this._config;
  }
  set config(v: IComplexNameConfig) {
    this._config = v;
  }
  @Input() disabled = false;
  // @Input() control: FormControl;
  @Output() onChange = new EventEmitter<IComplexName>();
  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('middleInitial') middleInitial: ElementRef;
  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('title') title: ElementRef;
  isDisabled = false;

  private firstNameValidators = [];
  private lastNameValidators = [];

  onModelChange: Function = () => { };
  onModelTouched: Function = () => { };

  constructor(private fb: FormBuilder) { }

  private setupConfig() {
    this._config = new ComplexNameConfig();
    this._config.firstNameMaxLength = 50;
    this._config.firstNameMinLength = 3;
    this._config.isFirstNameMandatory = true;
    this._config.lastNameMaxLength = 50;
    this._config.lastNameMinLength = 3;
    this._config.isLastNameMandatory = true;
    this._config.validationPlaceKind = ValidationPlaceKind.Inside;
  }

  ngOnInit() {
    let updateOnObj = null;
    if (this._config) {
      if (this._config.isUpdateOnBlur) {
        updateOnObj = { updateOn: 'blur' };
      } else {
        updateOnObj = { updateOn: 'submit' };
      }
    }
    // create reactive form with FormBuilder
    this.complexNameForm = this.fb.group({
      firstName: [{value: '', disabled: this.isDisabled }],
      middleInitial: [{value: '', disabled: this.isDisabled }, [Validators.maxLength(3)]],
      lastName: [{value: '', disabled: this.isDisabled }]
      // title not created
    }, updateOnObj);
    // set the validators dinamically based on the config class
    if (this.config) {
      this.firstNameValidators = [];
      if (this.config.isFirstNameMandatory) {
        this.firstNameValidators.push(Validators.required);
      }
      if (this.config.firstNameMinLength) {
        this.firstNameValidators.push(Validators.minLength(this.config.firstNameMinLength));
      }
      if (this.config.firstNameMaxLength) {
        this.firstNameValidators.push(Validators.maxLength(this.config.firstNameMaxLength));
      }
      const firstNameFormControl = this.complexNameForm.get('firstName');
      firstNameFormControl.setValidators(this.firstNameValidators);
      firstNameFormControl.updateValueAndValidity();
      this.lastNameValidators = [];
      if (this.config.isLastNameMandatory) {
        this.lastNameValidators.push(Validators.required);
      }
      if (this.config.lastNameMinLength) {
        this.lastNameValidators.push(Validators.minLength(this.config.lastNameMinLength));
      }
      if (this.config.lastNameMaxLength) {
        this.lastNameValidators.push(Validators.maxLength(this.config.lastNameMaxLength));
      }
      const lastNameFormControl = this.complexNameForm.get('lastName');
      lastNameFormControl.setValidators(this.lastNameValidators);
      lastNameFormControl.updateValueAndValidity();
    } else {
      throw new Error('Configuration not defined!');
    }
  }

  onChangeFirstName(value: string) {
    this.nameModel.firstName = value;
    this.onModelChange(this.nameModel);
    this.onModelTouched();
    this.onChange.emit(this.nameModel);
  }

  isValidationPlaceInsideComponent(): boolean {
    let isInside = true;
    if (this._config) {
      isInside = this._config.validationPlaceKind === ValidationPlaceKind.Inside;
    }
    return isInside;
  }

  extractFormControl(controlName: string): FormControl {
    const fc = this.complexNameForm.get(controlName);
    return <FormControl>fc;
  }


  onChangeMiddleInitial(value: string) {
    this.nameModel.middleInitial = value;
    this.onModelChange(this.nameModel);
    this.onModelTouched();
    this.onChange.emit(this.nameModel);
  }

  onChangeLastName(value: string) {
    this.nameModel.lastName = value;
    this.onModelChange(this.nameModel);
    this.onModelTouched();
    this.onChange.emit(this.nameModel);
  }

  onChangeTitle(value: string) {
    this.onModelChange(this.nameModel);
    this.onModelTouched();
    this.onChange.emit(this.nameModel);
  }

  isConfigUpdateOnBlur(): boolean {
    return this._config && this._config.isUpdateOnBlur;
  }

  onDone(form: FormGroup) {
    console.log(JSON.stringify(this._nameModel));
  }

  /*
   * Writes a new value to the element.
   *
   * This method will be called by the forms API to write to the view when programmatic
   * (model -> view) changes are requested.
   */
  writeValue(obj: any): void {
    if (obj) {
      if (obj instanceof ComplexName) {
        const firstNameValue = (<ComplexName>obj).firstName;
        this.firstName.nativeElement.value = firstNameValue;
        const middleInitialValue = (<ComplexName>obj).middleInitial;
        this.middleInitial.nativeElement.value = middleInitialValue;
        const lastNameValue = (<ComplexName>obj).lastName;
        this.lastName.nativeElement.value = lastNameValue;
      }
    } else {
      this._nameModel = new ComplexName();
      this.firstName.nativeElement.value = this._nameModel.firstName;
      this.middleInitial.nativeElement.value = this._nameModel.middleInitial;
      this.lastName.nativeElement.value = this._nameModel.lastName;
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
      if (c.value instanceof ComplexName) {
        const complexNameValue = <ComplexName>c.value;
        if (this._config.firstNameMinLength) {
          if (complexNameValue.firstName) {
            if (complexNameValue.firstName.length < this._config.firstNameMinLength) {
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
              // this.nameModel.first = null;
            }
          }
        }
        if (this._config.firstNameMaxLength) {
          if (complexNameValue.firstName) {
            if (complexNameValue.firstName.length > this._config.firstNameMaxLength) {
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
              // this.nameModel.first = null;
            }
          }
        }
        if (this._config.isFirstNameMandatory) {
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
            // this.nameModel.first = null;
          }
        }
        if (this._config.lastNameMinLength) {
          if (complexNameValue.lastName) {
            if (complexNameValue.lastName.length < this._config.lastNameMinLength) {
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
        if (this._config.lastNameMaxLength) {
          if (complexNameValue.lastName) {
            if (complexNameValue.lastName.length > this._config.lastNameMaxLength) {
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
        if (this._config.isLastNameMandatory) {
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
            // this.nameModel.last = null;
          }
        }
      } else {
        console.error('Model is not a ComplexName model!');
      }
    } else {
      console.error('Model is not initialized!');
    }
    return validationResult;
  }
}

