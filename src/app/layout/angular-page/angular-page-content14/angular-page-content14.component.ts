import { Component, OnInit } from '@angular/core';
import { OperationKind } from 'src/app/shared/components/signup-signin/operation-kind';

@Component({
  selector: 'app-angular-page-content14',
  templateUrl: './angular-page-content14.component.html',
  styleUrls: ['./angular-page-content14.component.scss']
})
export class AngularPageContent14Component implements OnInit {
  githubLogoPath: string;
  constructor() { }
  signupOrSignin = OperationKind;
  displaySignUp = false;
  displaySignIn = false;
  operationKind: OperationKind;

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }

  onClickSignUp() {
    this.operationKind = OperationKind.SIGNUP;
    this.displaySignUp = true;
  }

  onClickSignIn() {
    this.operationKind = OperationKind.SIGNIN;
    this.displaySignIn = true;
  }

}
