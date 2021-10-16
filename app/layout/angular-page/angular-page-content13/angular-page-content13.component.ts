import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { PublicKeyCredentialCreationOptionsModel } from './models/public-key-credential-creation-optionx.model';
// import { FirebaseUsersService } from './services/firebase-users.service';
import { GuidGeneratorService } from './services/guid-generator.service';

@Component({
  selector: 'app-angular-page-content13',
  templateUrl: './angular-page-content13.component.html',
  styleUrls: ['./angular-page-content13.component.scss']
})
export class AngularPageContent13Component implements OnInit {
  mainForm: FormGroup;
  githubLogoPath: string;
  publicKeyCredentialCreationOptionsModel: PublicKeyCredentialCreationOptionsModel;
  uuidForChallenge: string;
  passwordMinLength = 8;

  constructor(
    private guidGeneratorService: GuidGeneratorService,
    private formBuilder: FormBuilder,
    /*private firebaseUsersService: FirebaseUsersService*/) { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.mainForm = this.createForm();
    this.guidGeneratorService.getUUID().subscribe(uuid => {
      this.uuidForChallenge = uuid;
      this.initialize();
    });
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      signUp: this.formBuilder.group({
        password: new FormControl( null, { validators : [ Validators.required, Validators.minLength(this.passwordMinLength) ] } ),
        confirmPassword: [ null, { validators : [ Validators.required, Validators.minLength(this.passwordMinLength) ] } ] 
      }, { validators: [ CustomValidators.formGroupValidator ] } ),
      signIn: this.formBuilder.group({
        password: this.formBuilder.control(null, [ Validators.required, Validators.minLength(this.passwordMinLength) ] ),
        confirmPassword: this.formBuilder.control(null, [ Validators.required, Validators.minLength(this.passwordMinLength) ] )
      }, { validators: [ CustomValidators.formGroupValidator ] } )
    });
  }

  private initialize() {
    /*
      new id will came from # of Users + 1 which set into this.publicKeyCredentialCreationOptionsModel.user.id
    */
  }

}
