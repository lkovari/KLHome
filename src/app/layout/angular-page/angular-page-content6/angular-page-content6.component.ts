import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map } from 'rxjs/operators';
import { CustomFormModel } from './data-model/custom-form.model';
import { ZipCodeService } from './services/zip-code.service';

@Component({
  selector: 'app-angular-page-content6',
  templateUrl: './angular-page-content6.component.html',
  styleUrls: ['./angular-page-content6.component.scss']
})
export class AngularPageContent6Component implements OnInit {
  customForm: FormGroup;
  // http://regexlib.com/Search.aspx?k=us+zip+code&c=-1&m=-1&ps=20
  zipPattern = '^[0-9]{5}(?:-[0-9]{4})?$';
  customDataModel: CustomFormModel;
  githubLogoPath: string;
  formData: any;
  textMinLength = 7;

  constructor(private formBuilder: FormBuilder, 
    private injector: Injector
    ) { }

  ngOnInit() {
    this.customForm = this.formBuilder.group( {
      customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
      customNumber: [ { value: null }, [ Validators.required ] ],
      emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],

      customTab1 : this.formBuilder.group( {
        customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
        customNumber: [ { value: null }, [ Validators.required ] ],
        emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],
        freeText: [ { value: null }, [ Validators.nullValidator] ],
        maskedText: [ { value: null }, [ Validators.required ] ]
      } ),

      customTab2 : this.formBuilder.group( {
        customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
        customNumber: [ { value: null }, [ Validators.required ] ],
        emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],
        // v1 
        // zipCode: [ { value: null }, Validators.compose( [ Validators.required, Validators.pattern(this.zipPattern) ]), this.zipCodeValidator.validate.bind(this.zipCodeValidator)  ],
        // v2
        // zipCode: [ { value: null }, Validators.compose( [ Validators.required, Validators.pattern(this.zipPattern) ]), Validators.composeAsync( [ZipCodeValidator(this.zipCodeService) ])  ],
        // v3
        zipCode: [ { value: null }, Validators.compose( [ Validators.required, Validators.pattern(this.zipPattern) ]), this.zipCodeValidatorFn() ],
      } ),

      customTab3 : this.formBuilder.group( {
        customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
        customNumber: [ { value: null }, [ Validators.required ] ],
        emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],
        zipCode: [ { value: null }, [ Validators.required, Validators.pattern(this.zipPattern) ] ],
        freeText: [ { value: null } ]
      } ),

    });
        
    this.initializeDataModel();

    this.clearValues();

    this.customForm.valueChanges.subscribe(
      value => this.onValueChanged(value)
    );
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }
  
  /**
   * 
   * @param zipCodeService: ZipCodeService 
   * @returns AsyncValidatorFn
   */
  zipCodeValidatorFn(): AsyncValidatorFn {
    var zipCodeService = this.injector.get(ZipCodeService);
    return (ctrl: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return zipCodeService.zipCodeExists(parseInt(ctrl.value), false).pipe(
          debounceTime(1500),
          map((exists: boolean) => {
              const res = (exists) ? null : { zipCodeNotFoundAsync: true };
              // console.log(`zipCodeValidator zip ${ctrl.value} errors '${this.customForm.get('customTab2')?.get('zipCode')?.errors} zip exists ${exists}.`);
              return res;
          }
      ));
    };
  }  
  
 
  initializeDataModel() {
    this.customDataModel = new CustomFormModel();
  }

  onValueChanged(value) {
    this.formData = value;
    console.log(value);
  }

  setSampleValues() {
    this.customDataModel.customText = 'LKöváry';
    this.customDataModel.customNumber = 1965;
    this.customDataModel.emailAddress = 'laszlo.kovay@gmail.com';
    this.customDataModel.tabData1.customText = 'EKovary';
    this.customDataModel.tabData1.customNumber = 1966;
    this.customDataModel.tabData1.emailAddress = 'ekovary@kovary.com';
    this.customDataModel.tabData1.freeText = 'khggkhkd';
    this.customDataModel.tabData1.maskedText = '193956665';
    this.customDataModel.tabData2.customText = 'AKöváry';
    this.customDataModel.tabData2.customNumber = 1993
    this.customDataModel.tabData2.emailAddress = 'akovary@kovary.com';
    this.customDataModel.tabData2.zipCode = '30004';
    this.customDataModel.tabData3.customText = 'BKöváry';
    this.customDataModel.tabData3.customNumber = 1995;
    this.customDataModel.tabData3.emailAddress = 'bkovary@kovary.com';
    this.customDataModel.tabData3.freeText = 'sdklghklgsdjhdjkhgdjkg';
    this.customDataModel.tabData3.zipCode = '30023';
    this.setupValues(this.customDataModel);
  }

  clearValues() {
    this.customDataModel.customText = null;
    this.customDataModel.customNumber = null;
    this.customDataModel.emailAddress = null;
    this.customDataModel.tabData1.customText = null;
    this.customDataModel.tabData1.customNumber = null;
    this.customDataModel.tabData1.emailAddress = null;
    this.customDataModel.tabData1.freeText = null;
    this.customDataModel.tabData1.maskedText = null;
    this.customDataModel.tabData2.customText = null;
    this.customDataModel.tabData2.customNumber = null;
    this.customDataModel.tabData2.emailAddress = null;
    this.customDataModel.tabData2.zipCode = null;
    this.customDataModel.tabData3.customText = null;
    this.customDataModel.tabData3.customNumber = null;
    this.customDataModel.tabData3.emailAddress = null;
    this.customDataModel.tabData3.freeText = null;
    this.customDataModel.tabData3.zipCode = null;
    this.setupValues(this.customDataModel);
    this.customForm.updateValueAndValidity();
  }

  setupValues(model: CustomFormModel) {
    // all members
    this.customForm.setValue({
      'customText': model.customText,
      'customNumber': model.customNumber,
      'emailAddress': model.emailAddress,
      'customTab1' : {
        'customText': model.tabData1.customText,
        'customNumber': model.tabData1.customNumber,
        'emailAddress': model.tabData1.emailAddress,
        'freeText': model.tabData1.freeText,
        'maskedText': model.tabData1.maskedText
      },
      'customTab2' : {
        'customText': model.tabData2.customText,
        'customNumber': model.tabData2.customNumber,
        'emailAddress': model.tabData2.emailAddress,
        'zipCode': model.tabData2.zipCode
      },
      'customTab3' : {
        'customText': model.tabData3.customText,
        'customNumber': model.tabData3.customNumber,
        'emailAddress': model.tabData3.emailAddress,
        'freeText': model.tabData3.freeText,
        'zipCode': model.tabData3.zipCode
      }
    });
    this.customForm.updateValueAndValidity( { onlySelf: false, emitEvent: true } );
  }

}
