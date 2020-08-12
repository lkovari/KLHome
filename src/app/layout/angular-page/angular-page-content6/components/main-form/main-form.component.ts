import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { CustomFormModel } from '../../../../../layout/angular-page/angular-page-content6/data-model/custom-form.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})
export class MainFormComponent implements OnInit {
  textMinLength = 7;
  githubLogoPath: string;
  formControlStatusKeys = ['status', 'dirty', 'pristine', 'touched', 'untouched', 'valid', 'invalid', 'value', 'errors'];
  tabItems: MenuItem[];
  activeItem: MenuItem | null;
  tabIndex: number;
  selectedFormModel: FormGroup | null;
  @Input() customForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.tabItems = [
      {
        id: 'tab1', label: 'Tab #1', icon: 'fa fa-fw fa-bar-chart', command: (event) => {
          this.tabItemChanged(0);
          console.log('tab1 selected ' + event);
        }
      },
      {
        id: 'tab2', label: 'Tab #2', icon: 'fa fa-fw fa-calendar', command: (event) => {
          this.tabItemChanged(1);
          console.log('tab2 selected ' + event);
        }
      },
      {
        id: 'tab3', label: 'Tab #3', icon: 'fa fa-fw fa-book', command: (event) => {
          this.tabItemChanged(2);
          console.log('tab3 selected ' + event);
        }
      }
    ];
    this.activeItem = this.tabItems[0];
  }

  private tabItemChanged(ix: number) {
    this.activeItem = this.tabItems[ix];
    this.tabIndex = ix;
    switch (ix) {
      case 0: {
        this.selectedFormModel = <FormGroup>this.customForm.controls.customTab1;
        break;
      }
      case 1: {
        this.selectedFormModel = <FormGroup>this.customForm.controls.customTab2;
        break;
      }
      case 2: {
        this.selectedFormModel = <FormGroup>this.customForm.controls.customTab3;
        break;
      }
    }
  }

  setSampleValues() {
    const customDataModel = new CustomFormModel();
    customDataModel.customText = 'LKöváry';
    customDataModel.customNumber = 1965;
    customDataModel.emailAddress = 'laszlo.kovay@gmail.com';
    customDataModel.tabData1.customText = 'EKovary';
    customDataModel.tabData1.customNumber = 1966;
    customDataModel.tabData1.emailAddress = 'ekovary@kovary.com';
    customDataModel.tabData1.freeText = 'khggkhkd';
    customDataModel.tabData1.maskedText = '193956665';
    customDataModel.tabData2.customText = 'AKöváry';
    customDataModel.tabData2.customNumber = 1993
    customDataModel.tabData2.emailAddress = 'akovary@kovary.com';
    customDataModel.tabData2.zipCode = '30004';
    customDataModel.tabData3.customText = 'BKöváry';
    customDataModel.tabData3.customNumber = 1995;
    customDataModel.tabData3.emailAddress = 'bkovary@kovary.com';
    customDataModel.tabData3.freeText = 'sdklghklgsdjhdjkhgdjkg';
    customDataModel.tabData3.zipCode = '30023';
    this.setupValues(customDataModel);
  }

  clearValues() {
    const customDataModel = new CustomFormModel();
    customDataModel.customText = null;
    customDataModel.customNumber = null;
    customDataModel.emailAddress = null;
    customDataModel.tabData1.customText = null;
    customDataModel.tabData1.customNumber = null;
    customDataModel.tabData1.emailAddress = null;
    customDataModel.tabData1.freeText = null;
    customDataModel.tabData1.maskedText = null;
    customDataModel.tabData2.customText = null;
    customDataModel.tabData2.customNumber = null;
    customDataModel.tabData2.emailAddress = null;
    customDataModel.tabData2.zipCode = null;
    customDataModel.tabData3.customText = null;
    customDataModel.tabData3.customNumber = null;
    customDataModel.tabData3.emailAddress = null;
    customDataModel.tabData3.freeText = null;
    customDataModel.tabData3.zipCode = null;
    this.setupValues(customDataModel);
    this.clearFormControl(this.customForm);
  }

  private clearFormControl(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = this.customForm.controls[key];
      if (control instanceof FormGroup) {
        const fg = <FormGroup>control;
        this.clearFormControl(fg);
      } else if (control instanceof FormArray) {
        const fa = <FormArray>control;
        // go step by step on the FormArray
        for (let ix = 0; ix < fa.length; ix++) {
          const fg = fa.at(ix);
          if (fg instanceof FormGroup) {
            // call clearFormControl for each Form element of the FormArray
            this.clearFormControl(fg);
          }
        }
      } else if (control instanceof FormControl) {
        // clear the Field
        control.reset();
        control.updateValueAndValidity();
      }
    });
    // at last the clear the Form
    formGroup.reset();
    formGroup.updateValueAndValidity();
  }

  setupValues(model: CustomFormModel) {
    // all members
    this.customForm.setValue({
      'customText': model.customText,
      'customNumber': model.customNumber,
      'emailAddress': model.emailAddress,
      'customTab1': {
        'customText': model.tabData1.customText,
        'customNumber': model.tabData1.customNumber,
        'emailAddress': model.tabData1.emailAddress,
        'freeText': model.tabData1.freeText,
        'maskedText': model.tabData1.maskedText
      },
      'customTab2': {
        'customText': model.tabData2.customText,
        'customNumber': model.tabData2.customNumber,
        'emailAddress': model.tabData2.emailAddress,
        'zipCode': model.tabData2.zipCode
      },
      'customTab3': {
        'customText': model.tabData3.customText,
        'customNumber': model.tabData3.customNumber,
        'emailAddress': model.tabData3.emailAddress,
        'freeText': model.tabData3.freeText,
        'zipCode': model.tabData3.zipCode
      }
    });
  }

  onSetModel(event: MouseEvent) {
    this.setSampleValues();
    console.log('onSetModel click event fired ' + event);
  }

  onClearModel(event: MouseEvent) {
    this.clearValues();
    this.customForm.markAsUntouched();
    this.customForm.markAsPristine();
    console.log('onClearModel click event fired ' + event);
  }

  onUnselectTab(event: MouseEvent) {
    this.selectedFormModel = null;
    this.activeItem = null;
    this.tabIndex = -1;
    console.log('onUnselectTab click event fired ' + event);
  }

  onSubmit(customForm) {
    console.log(JSON.stringify(customForm.value));
    window.alert(JSON.stringify(customForm.value));
  }

  /*
  private markFormGroup(formGroup: FormGroup, controlStatusKind: ControlStatusKind) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      switch (controlStatusKind) {
        case ControlStatusKind.PRISTINE: {
          control.markAsPristine();
          break;
        }
        case ControlStatusKind.DIRTY: {
          control.markAsDirty();
          break;
        }
        case ControlStatusKind.TOUCHED: {
          control.markAsTouched();
          break;
        }
        case ControlStatusKind.UNTOUCHED: {
          control.markAsUntouched();
          break;
        }
      }
      control.updateValueAndValidity();
      if (control.controls) {
        this.markFormGroup(control, controlStatusKind);
      }
    });
  }
  */
}
