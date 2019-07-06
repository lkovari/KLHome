import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomFormModel } from './data-model/custom-form.model';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    const updateOnObj = { updateOn: 'change' };

    this.customForm = this.formBuilder.group( {
      customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
      customNumber: [ { value: null }, [ Validators.required ] ],
      emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],

      customTab1 : this.formBuilder.group( {
        customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
        customNumber: [ { value: null }, [ Validators.required ] ],
        emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],
        freeText: [ { value: null } ]
      } ),

      customTab2 : this.formBuilder.group( {
        customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
        customNumber: [ { value: null }, [ Validators.required ] ],
        emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],
        zipCode: [ { value: null }, [ Validators.required, Validators.pattern(this.zipPattern) ] ],
      } ),

      customTab3 : this.formBuilder.group( {
        customText: [ { value: null }, [ Validators.required, Validators.minLength(this.textMinLength) ] ],
        customNumber: [ { value: null }, [ Validators.required ] ],
        emailAddress: [ { value: null }, [ Validators.required, Validators.email ] ],
        zipCode: [ { value: null }, [ Validators.required, Validators.pattern(this.zipPattern) ] ],
        freeText: [ { value: null } ]
      } ),

    }, updateOnObj );

    this.initializeDataModel();

    this.clearValues();

    this.customForm.valueChanges.subscribe(
      value => this.onValueChanged(value)
    );
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-Light-32px.png';
  }

  initializeDataModel() {
    this.customDataModel = new CustomFormModel();
  }

  onValueChanged(value) {
    this.formData = value;
    console.log(value);
  }

  setSampleValues() {
    this.customDataModel.customText = 'LKövári';
    this.customDataModel.customNumber = 1965;
    this.customDataModel.emailAddress = 'lkovari@kovari.com';
    this.customDataModel.tabData1.customText = 'EKovari';
    this.customDataModel.tabData1.customNumber = 1966;
    this.customDataModel.tabData1.emailAddress = 'ekovari@kovari.com';
    this.customDataModel.tabData1.freeText = 'khggkhkd';
    this.customDataModel.tabData2.customText = 'AKövári';
    this.customDataModel.tabData2.customNumber = 1993
    this.customDataModel.tabData2.emailAddress = 'akovari@kovari.com';
    this.customDataModel.tabData2.zipCode = '30004';
    this.customDataModel.tabData3.customText = 'BKövári';
    this.customDataModel.tabData3.customNumber = 1995;
    this.customDataModel.tabData3.emailAddress = 'bkovari@kovari.com';
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
        'freeText': model.tabData1.freeText
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
  }


}
