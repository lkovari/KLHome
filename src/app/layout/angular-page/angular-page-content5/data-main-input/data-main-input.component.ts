import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { CustomFormModel } from '../custom-form-.model';
import { MenuItem } from 'primeng/primeng';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-data-main-input',
  templateUrl: './data-main-input.component.html',
  styleUrls: ['./data-main-input.component.scss']
})
export class DataMainInputComponent implements OnInit {
  @ViewChild('formData') formData: NgForm;
  isSubmitted = false;
  githubLogoPath: string;
  formControlStatusKeys = ['status', 'dirty', 'pristine', 'touched', 'untouched', 'valid', 'invalid', 'value', 'errors'];
  tabItems: MenuItem[];
  activeItem: MenuItem;
  tabIndex: number;
  minLength = 7;
  private _customFormModel: CustomFormModel;
  @Input() set customFormModel(v: CustomFormModel) {
    this._customFormModel = v;
  }
  get customFormModel(): CustomFormModel {
    return this._customFormModel;
  }

  form_data = {
    customcText: null,
    customNumber: null,
    customcText1: null,
    customNumber1: null,
    customcText2: null,
    customNumber2: null,
    customcText3: null,
    customNumber3: null
  };

  constructor() { }

  ngOnInit() {
    this.tabItems = [
      { label: 'Tab #1', icon: 'fa fa-fw fa-bar-chart', command: (event) => {
        this.tabItemChanged(0);
      }},
      {label: 'Tab #2', icon: 'fa fa-fw fa-calendar', command: (event) => {
        this.tabItemChanged(1);
      }},
      {label: 'Tab #3', icon: 'fa fa-fw fa-book', command: (event) => {
        this.tabItemChanged(2);
      }}
    ];
    // this.activeItem = this.tabItems[1];
    if (!this._customFormModel) {
      this._customFormModel = new CustomFormModel();
    }
  }

  private tabItemChanged(ix: number) {
    this.activeItem = this.tabItems[ix];
    this.tabIndex = ix;
  }

  onChanged(event) {
    console.log('onChanged event arg ' + JSON.stringify(event) + ' customText ' + JSON.stringify(this.customFormModel.customText));
  }

  onBlur(event) {
    console.log('onBlur event arg ' + JSON.stringify(event) + ' customText ' + JSON.stringify(this.customFormModel.customText));
  }

  onSubmit(formData: NgForm) {
    this.isSubmitted = true;
    this.form_data.customcText = formData.value.customText;
    this.form_data.customNumber = formData.value.customNumber;
    this.form_data.customcText1 = formData.value.tabInput1.customText1;
    this.form_data.customNumber1 = formData.value.tabInput1.customNumber1;
    this.form_data.customcText2 = formData.value.tabInput2.customText2;
    this.form_data.customNumber2 = formData.value.tabInput2.customNumber2;
    this.form_data.customcText3 = formData.value.tabInput3.customText3;
    this.form_data.customNumber3 = formData.value.tabInput3.customNumber3;
    // reset the form same as when reloaded
    formData.reset();
    console.log(this.form_data);
  }

  setModel() {
    this.formData.form.setValue(
      {
        customText: 'LKövári',
        customNumber: 1965,
        tabInput1: {
          customText: 'LKövári',
          customNumber: 1965
        },
        tabInput2: {
          customText: 'LKövári',
          customNumber: 1965
        },
        tabInput3: {
          customText: 'LKövári',
          customNumber : 1965
        }
      }
    );
  }

  onSetModel(event) {
    this.setModel();
  }

  clearValues() {
    this.formData.form.setValue(
      {
        customText: null,
        customNumber: null,
        tabInput1: {
          customText: null,
          customNumber: null
        },
        tabInput2: {
          customText: null,
          customNumber: null
        },
        tabInput3: {
          customText: null,
          customNumber : null
        }
      }
    );
  }

  onClearModel(event) {
    this.clearValues();
  }
}
