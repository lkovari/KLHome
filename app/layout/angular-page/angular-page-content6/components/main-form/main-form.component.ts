import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MenuItem } from 'primeng/primeng';
import { CustomFormModel } from 'app/layout/angular-page/angular-page-content6/data-model/custom-form.model';
import { ControlStatusKind } from '../../data-model/control-status-kind.enum';

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
  activeItem: MenuItem;
  tabIndex: number;
  selectedFormModel: FormGroup;
  @Input() customForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.tabItems = [
      {
        id: 'tab1', label: 'Tab #1', icon: 'fa fa-fw fa-bar-chart', command: (event) => {
          this.tabItemChanged(0);
        }
      },
      {
        id: 'tab2', label: 'Tab #2', icon: 'fa fa-fw fa-calendar', command: (event) => {
          this.tabItemChanged(1);
        }
      },
      {
        id: 'tab3', label: 'Tab #3', icon: 'fa fa-fw fa-book', command: (event) => {
          this.tabItemChanged(2);
        }
      }
    ];
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
    customDataModel.customText = 'LKövári';
    customDataModel.customNumber = 1965;
    customDataModel.emailAddress = 'lkovari@kovari.com';
    customDataModel.tabData1.customText = 'EKovari';
    customDataModel.tabData1.customNumber = 1966;
    customDataModel.tabData1.emailAddress = 'ekovari@kovari.com';
    customDataModel.tabData1.freeText = 'khggkhkd';
    customDataModel.tabData2.customText = 'AKövári';
    customDataModel.tabData2.customNumber = 1993
    customDataModel.tabData2.emailAddress = 'akovari@kovari.com';
    customDataModel.tabData2.zipCode = '30004';
    customDataModel.tabData3.customText = 'BKövári';
    customDataModel.tabData3.customNumber = 1995;
    customDataModel.tabData3.emailAddress = 'bkovari@kovari.com';
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
        'freeText': model.tabData1.freeText
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

  onSetModel(event) {
    this.setSampleValues();
  }

  onClearModel(event) {
    this.clearValues();
    this.customForm.markAsUntouched();
    this.customForm.markAsPristine();
  }

  onUnselectTab(event) {
    this.selectedFormModel = null;
    this.activeItem = null;
    this.tabIndex = -1;
  }

  onSubmit(customForm) {
    console.log(JSON.stringify(customForm.value));
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
