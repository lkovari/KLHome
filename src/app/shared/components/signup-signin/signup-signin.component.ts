import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OperationKind } from './operation-kind';
import { PasswordValidator } from './password-validator';

@Component({
  selector: 'app-signup-signin',
  templateUrl: './signup-signin.component.html',
  styleUrls: ['./signup-signin.component.scss']
})
export class SignupSigninComponent implements OnInit {
  githubLogoPath: string;  
  mainForm: FormGroup;
  userNameMin = 8;
  userNameMax = 25;
  // minimum one letter and one number and min length is eight character
  passwordPattern = '^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}$';
  private _operationKind: OperationKind;
  @Input()
  get operationKind(): OperationKind {
    return this._operationKind;
  }
  set operationKind(v: OperationKind) {
    this._operationKind = v;
    if (v) {
      this.createAndAddFormControlsDynamically();
    }
  }
  signupOrSignin = OperationKind;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
     this.createForm();
  }

  private createForm() {
    this.mainForm = this.formBuilder.group(
      {
        userName: [ '' , [ Validators.required, Validators.minLength(this.userNameMin), Validators.maxLength(this.userNameMax) ] ],
      });
  }

  private createAndAddFormControlsDynamically() {
    this.mainForm.removeControl('password');
    this.mainForm.removeControl('passwordGroup');    
    switch (this._operationKind) {
      case OperationKind.SIGNUP : {
        this.mainForm.addControl('passwordGroup', this.createSignUp());
        break;
      }
      case OperationKind.SIGNIN : {
        this.mainForm.addControl('password', this.createSignIn());
        break;
      }
    }
    this.mainForm.updateValueAndValidity();
  }

  private createSignUp(): AbstractControl {
    return this.formBuilder.group({ 
      password: [ '', [ Validators.required, Validators.pattern(this.passwordPattern) ] ],
      confirmPassword: [ '', [ Validators.required, Validators.pattern(this.passwordPattern) ] ]
    }, { validator: PasswordValidator.passwordCrossValidator } );
  }
  
  private createSignIn(): AbstractControl {
    // with FormBuilder
    return this.formBuilder.control(
      {value: null, disabled: false}, [ Validators.required, Validators.pattern(this.passwordPattern) ]
    );
    // with new keyword
    // return new FormControl('', [Validators.required, Validators.pattern(this.passwordPattern)]);
  }

  onSubmit(mainForm: FormGroup) {
    console.log(JSON.stringify(mainForm.value));
  }

  onClear(mainForm: FormGroup) {
    const passwordGroup = mainForm.get('passwordGroup');
    if (passwordGroup) {
      passwordGroup.get('password')?.setValue(null);
      passwordGroup.get('confirmPassword')?.setValue(null);
    } else {
      mainForm.get('password')?.setValue(null);
    }
    mainForm.get('userName')?.setValue(null);
    mainForm.updateValueAndValidity();
  }
}
