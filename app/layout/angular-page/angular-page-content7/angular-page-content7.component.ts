import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl } from '@angular/forms';
import { RoleType } from './role-type.enum';
import { ModuleType } from './module-type.enum';
import { UserFormData } from './data-model/user-form-data.model';
import { UserRole } from './data-model/user-role.model';
import { ModuleTypeModel } from './data-model/module-type.model';
import { RoleTypeModel } from './data-model/role-type.model';
import { FormArrayCustomValidators, IDupEntry } from './formarray-custom-validators';

/*
const passwordCrossFieldValidator: ValidatorFn = (fg: FormGroup) => {
  const passwordControl = fg.get('password');
  const confirmPasswordControl = fg.get('confirmPassword');
  if (passwordControl && confirmPasswordControl) {
    if (passwordControl.value === confirmPasswordControl.value) {
      return null;
    }
  }
  return { notidentical: true };
};
*/

@Component({
  selector: 'app-angular-page-content7',
  templateUrl: './angular-page-content7.component.html',
  styleUrls: ['./angular-page-content7.component.scss']
})
export class AngularPageContent7Component implements OnInit {
  AMOUNT_MAX = 9999999.99;
  AMOUNT_MIN = 0.00;
  mainForm: FormGroup;
  mainFormData: any;
  mainFormSubmitData: any;
  mainFormModel: UserFormData;
  // one letter one number and min length is eight character
  passwordPattern = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{8,}$';
  // userNamePattern = '^[a-z0-9_-]{8,15}$';
  githubLogoPath: string;
  userNameMinLength = 7;
  descriptionMaxLength = 17;
  roleTypes: Array<RoleTypeModel>;
  moduleTypes: Array<ModuleTypeModel>;
  todayDate: Date;
  maxFormArrayItems = 5;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.mainForm = this.formBuilder.group({
      userName: [ null, [ Validators.required, Validators.minLength(this.userNameMinLength) ] ],
      passwordGroup: this.formBuilder.group({
        password: [ null, [ Validators.required, Validators.pattern(this.passwordPattern) ] ],
        confirmPassword: [ null, [ Validators.required, Validators.pattern(this.passwordPattern) ] ]
      }, { validator: FormArrayCustomValidators.passwordCrossValidator } ),
      userRoles: this.formBuilder.array( [this.createUserRole(null) ], FormArrayCustomValidators.userRolesValidator )
    });

    this.mainForm.valueChanges.subscribe(
      value => this.onValueChanged(value)
    );

    this.initializeRoleTypes();
    this.initializeModuleTypes();
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.todayDate = new Date();
  }

  private initializeRoleTypes() {
    this.roleTypes = [];
    const enumMembers = Object.keys(RoleType);
    const enumMap = enumMembers.filter((x) => Number.isNaN(parseInt(x, 10)));
    this.roleTypes = enumMap.map((key) => {
      return { label: key, value: RoleType[key], disabled: false };
    });
  }

  private initializeModuleTypes() {
    this.moduleTypes = [];
    const enumMembers = Object.keys(ModuleType);
    const enumMap = enumMembers.filter((x) => Number.isNaN(parseInt(x, 10)));
    this.moduleTypes = enumMap.map((key) => {
      return { label: key, value: ModuleType[key], disabled: false };
    });
  }

  addUserRole(): void {
    (<FormArray>this.mainForm?.get('userRoles')).push(this.createUserRole(null));
  }

  canAddMoreRow(): boolean {
    return (<FormArray>this.mainForm?.get('userRoles')).controls.length < this.maxFormArrayItems;
  }

  canAddThreeRows(): boolean {
    return (<FormArray>this.mainForm?.get('userRoles')).controls.length === 0;
  }

  /**
   * findRoleTypeByOrdinal
   * @param ord ~ ordinal of the enum
   */
  private findRoleTypeByOrdinal(ord: number): RoleTypeModel | undefined {
    const roleTypeItem = this.roleTypes.find((rt: RoleTypeModel) => {
      return rt.value === ord;
    });
    return roleTypeItem;
  }

  evaluateUserRoles(): FormArray {
    return <FormArray>this.mainForm.get('userRoles');
  }

  /**
   * findModuleTypeByOrdinal
   * @param ord ~ ordinal of the enum
   */
  private findModuleTypeByOrdinal(ord: number): ModuleTypeModel | undefined {
    const roleTypeItem = this.moduleTypes.find((rt: ModuleTypeModel) => {
      return rt.value === ord;
    });
    return roleTypeItem;
  }

  createUserRole(userRole: UserRole | null): FormGroup {
    const userRoleGroup = this.formBuilder.group({
      roleType: [ null, [ Validators.required ] ],
      moduleType: [ null, [ Validators.required ] ],
      description: [ null, [ Validators.maxLength(this.descriptionMaxLength) ] ],
      expire: Date,
      amount: [ null, [ Validators.required, Validators.min(this.AMOUNT_MIN), Validators.max(this.AMOUNT_MAX) ] ]
    });
    userRoleGroup.setValue({
      'roleType': userRole && userRole.roleType ? this.findRoleTypeByOrdinal(userRole.roleType) : null,
      'moduleType': userRole && userRole.moduleType ? this.findModuleTypeByOrdinal(userRole.moduleType) : null,
      'description': userRole && userRole.description ? userRole.description : null,
      'expire': userRole && userRole.expire ? userRole.expire : new Date(),
      'amount': userRole && userRole.amount ? userRole.amount : null
    });
    return userRoleGroup;
  }

  /*
  getUserRoleControls() {
    return (<FormArray>this.mainForm?.get('userRoles')).controls;
  }
  */

  setupValues(model: UserFormData) {
    // all members
    this.mainForm?.patchValue({
      'userName': model.userName ? model.userName : null,
      'passwordGroup': {
        'password': model.password ? model.password : null,
        'confirmPassword': model.confirmPassword ? model.confirmPassword : null,
      },
      'userRoles': []
    });
    if (model.userRoles && model.userRoles.length > 0) {
      model.userRoles.forEach((role: UserRole) => {
        (<FormArray>this.mainForm?.get('userRoles')).push(this.createUserRole(role));
      });
    } else {
      const ln = (<FormArray>this.mainForm?.get('userRoles')).length;
      for (let ix = ln; ix >= 0; ix--) {
        (<FormArray>this.mainForm?.get('userRoles')).removeAt(ix);
      }
    }
  }

  hasUserRoles(): boolean {
    return (<FormArray>this.mainForm?.get('userRoles')).length > 0;
  }

  onValueChanged(value) {
    this.mainFormData = value;
    console.log(value);
  }

  calcTabIndex(ix: number, seq: number): number {
    return (ix * 10) + seq;
  }

  onAddUserRole(event: MouseEvent) {
    (<FormArray>this.mainForm?.get('userRoles')).push(this.createUserRole(null));
    console.log('onAddUserRole click event fired ' + event);
  }

  onSetModel(event: MouseEvent) {
    this.clearModel();
    const userFormData = new UserFormData();
    userFormData.userName = 'lkovary';
    userFormData.password = 'Passw0rd@';
    userFormData.confirmPassword = 'Passw0rd@';
    userFormData.userRoles = [
      {
        roleType: RoleType.USER,
        moduleType: ModuleType.INVENTORY,
        expire : new Date('02/02/2027'),
        description: 'Inventory role',
        amount: 1234.56
      },
      {
        roleType: RoleType.POWERUSER,
        moduleType: ModuleType.LEDGER,
        expire : new Date('02/02/2027'),
        description: 'Ledger role',
        amount: 111111.11
      },
      {
        roleType: RoleType.USER,
        moduleType: ModuleType.REPORT,
        expire : new Date('02/02/2027'),
        description: 'registration role',
        amount: 0
      },
    ];
    this.setupValues(userFormData);
    console.log('onSetModel Click event Fired ' + event)
  }

  private clearModel() {
    const userFormData = new UserFormData();
    this.setupValues(userFormData);
    this.mainForm?.markAsUntouched();
    this.mainForm?.markAsPristine();
    this.mainFormData = undefined;
    this.mainFormSubmitData = undefined;
  }

  /*
  private hasFractionPart(v: number): boolean {
    const intPart = Math.trunc(v);
    let frac = v - intPart;
    return frac > 0;
  }

  private fracGreaterThan(v: number, fracNum: number): boolean {
    let res = false;
    const vs = '' + v;
    if (vs.indexOf('.') > -1) {
      const v_split = vs.split('.');
      const frac_s = v_split[1];
      res = frac_s.length > fracNum;
    }
    return res;
  }

  onKeyUp(formGroup: FormGroup) {
    if (formGroup) {
      let vv = 0;
      const amountFormControl = <FormControl>formGroup.get('amount');
      if (!amountFormControl.valid) {
        amountFormControl.patchValue(null);
      }
      let v = formGroup.get('amount')?.value;
      console.log(v);
      if (v) {
        if (v > 999999.99) {
          if (this.hasFractionPart(v)) {
            const intPart = Math.trunc(v);
            let frac = v - intPart;
            frac = +(Math.trunc(frac * 100) / 100).toFixed(2);
            vv = intPart + frac;
          } else {
            vv = Math.trunc(+(v / 10).toFixed(1))
          }
        } else {
          if (this.fracGreaterThan(v, 2)) {
          vv = Math.trunc(v);
          } else {
          const intPart = Math.trunc(v);
          let frac = v - intPart;

          frac = +((frac * 100) / 100).toFixed(2)
          vv = intPart + frac;
          }
        }
        if (v !== vv) {
          v = vv;
          formGroup.get('amount')?.patchValue(v);
        }
      }
    }
  }
  */
  onClearModel(event: MouseEvent) {
    this.clearModel();
    console.log('onClearModel click event fired ' + event);
  }

  isUserFieldInvalid(formControl: AbstractControl | null, field: string): boolean {
    // Not-null assertion operator
    // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#non-null-assertion-operator
    /*
     Original code before Angular 10 (ur?.get(field)!.touched || ur?.get(field)!.dirty) && !ur?.get(field)!.valid) : false);
     */
    let isInvalid = false;
    if (formControl) {
      const dataField = formControl.get(field);
      if (dataField) {
        isInvalid = dataField.invalid;
      } else {
        isInvalid = false;
      }
    } else {
      isInvalid = false;
    }
    return isInvalid;
  }

  hasDuplicatedRows(form: FormGroup | null): boolean | undefined | null {
    const userRolesFormArray = form?.get('userRoles');
    // return userRolesFormArray?.errors && userRolesFormArray.errors.duplication;
    return userRolesFormArray?.errors && userRolesFormArray.errors.duplications !== null;
  }

  extractErrorValue(): IDupEntry[] | null {
    return this.mainForm?.get('userRoles')?.errors?.duplications?.values;
  }

  trackByFn(itemAny: any): any {
    const item = <UserRole>itemAny;
    return item.roleType + item.moduleType;
  }

  onSubmit(form: any) {
    this.mainFormSubmitData = form.value;
    console.log('Form is submitted!');
    console.log(JSON.stringify(form.value));
    window.alert(JSON.stringify(form.value));
   }
}
