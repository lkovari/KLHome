import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { RoleType } from './role-type.enum';
import { ModuleType } from './module-type.enum';
import { UserFormData } from './data-model/user-form-data.model';
import { UserRole } from './data-model/user-role.model';
import { ModuleTypeModel } from './data-model/module-type.model';
import { RoleTypeModel } from './data-model/role-type.model';
import { CustomValidators } from './custom-validators';


@Component({
  selector: 'app-angular-page-content7',
  templateUrl: './angular-page-content7.component.html',
  styleUrls: ['./angular-page-content7.component.scss']
})
export class AngularPageContent7Component implements OnInit {
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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const updateOnObj = { updateOn: 'submit' };
    this.mainForm = this.formBuilder.group({
      userName: [ null, [ Validators.required, Validators.minLength(this.userNameMinLength) ] ],
      passwordGroup: this.formBuilder.group({
        password: [ null, [ Validators.required, Validators.pattern(this.passwordPattern) ] ],
        confirmPassword: [ null, [ Validators.required, Validators.pattern(this.passwordPattern) ] ]
      }, { validator: CustomValidators.passwordCrossValidator } ),
      userRoles: this.formBuilder.array( [this.createUserRole(null) ], CustomValidators.userRolesValidator )
    }, updateOnObj);

    this.mainForm.valueChanges.subscribe(
      value => this.onValueChanged(value)
    );

    this.initializeRoleTypes();
    this.initializeModuleTypes();
    this.githubLogoPath = 'assets/images/GitHub-Mark-32px.png';
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
    (<FormArray>this.mainForm.get('userRoles')).push(this.createUserRole(null));
  }

  canAddMoreRow(): boolean {
    return (<FormArray>this.mainForm.get('userRoles')).controls.length < 3;
  }

  canAddThreeRows(): boolean {
    return (<FormArray>this.mainForm.get('userRoles')).controls.length === 0;
  }

  createUserRole(userRole: UserRole): FormGroup {
    const userRoleGroup = this.formBuilder.group({
      roleType: [ null, [ Validators.required ] ],
      moduleType: [ null, [ Validators.required ] ],
      description: [ null, [ Validators.maxLength(this.descriptionMaxLength) ] ],
      expire: Date
    });
    userRoleGroup.setValue({
      'roleType': userRole && userRole.roleType ? userRole.roleType : null,
      'moduleType': userRole && userRole.moduleType ? userRole.moduleType : null,
      'description': userRole && userRole.description ? userRole.description : null,
      'expire': userRole && userRole.expire ? userRole.expire : new Date()
    });
    return userRoleGroup;
  }

  getUserRoleControls() {
    return (<FormArray>this.mainForm.get('userRoles')).controls;
  }

  setupValues(model: UserFormData) {
    // all members
    this.mainForm.patchValue({
      'userName': model.userName ? model.userName : null,
      'passwordGroup': {
        'password': model.password ? model.password : null,
        'confirmPassword': model.confirmPassword ? model.confirmPassword : null,
      },
      'userRoles': []
    });
    if (model.userRoles && model.userRoles.length > 0) {
      model.userRoles.forEach((role: UserRole) => {
        (<FormArray>this.mainForm.get('userRoles')).push(this.createUserRole(role));
      });
    } else {
      const ln = (<FormArray>this.mainForm.get('userRoles')).length;
      for (let ix = ln; ix >= 0; ix--) {
        (<FormArray>this.mainForm.get('userRoles')).removeAt(ix);
      }
    }
  }

  hasUserRoles(): boolean {
    return (<FormArray>this.mainForm.get('userRoles')).length > 0;
  }

  onValueChanged(value) {
    this.mainFormData = value;
    console.log(value);
  }

  calcTabIndex(ix: number, seq: number): number {
    return (ix * 10) + seq;
  }

  onAddUserRole(event) {
    (<FormArray>this.mainForm.get('userRoles')).push(this.createUserRole(null));
  }

  onSetModel(event) {
    const userFormData = new UserFormData();
    userFormData.userName = 'lkovari';
    userFormData.password = 'Passw0rd@';
    userFormData.confirmPassword = 'Passw0rd@';
    userFormData.userRoles = [
      {
        roleType: RoleType.USER,
        moduleType: ModuleType.INVENTORY,
        expire : new Date('02/02/2027'),
        description: 'Inventory role'
      },
      {
        roleType: RoleType.POWERUSER,
        moduleType: ModuleType.LEDGER,
        expire : new Date('02/02/2027'),
        description: 'Ledger role'
      },
      {
        roleType: RoleType.USER,
        moduleType: ModuleType.REPORT,
        expire : new Date('02/02/2027'),
        description: 'registration role'
      },
    ];
    this.setupValues(userFormData);
  }

  onClearModel(event) {
    const userFormData = new UserFormData();
    this.setupValues(userFormData);
    this.mainForm.markAsUntouched();
    this.mainForm.markAsPristine();
    this.mainFormData = undefined;
    this.mainFormSubmitData = undefined;
  }

  isUserFieldInvalid(ur: FormControl, field: string): boolean {
    return ((ur.get(field).touched || ur.get(field).dirty) && !ur.get(field).valid);
  }

  hasDuplicatedRows(form: FormGroup) {
    const userRolesFormArray = form.get('userRoles');
    return userRolesFormArray.errors && userRolesFormArray.errors.duplication;
  }

  onSubmit(form) {
    this.mainFormSubmitData = form.value;
    console.log('Form is submitted!');
    console.log(JSON.stringify(form.value));
   }
}
