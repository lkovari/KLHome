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
    this.githubLogoPath = 'assets/images/GitHub-Mark-32px.png';
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
    Object.assign(this.form_data, formData.value);
    console.log(this.form_data);
  }

  setModel() {
    this.formData.form.setValue(
      {
        customText: 'LKövári T#0',
        customNumber: 1965,
        tabInput1: {
          customText: 'LKövári T#1',
          customNumber: 1965
        },
        tabInput2: {
          customText: 'LKövári T#2',
          customNumber: 1965
        },
        tabInput3: {
          customText: 'LKövári T#3',
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
    this.formData.form.markAsPristine();
    this.formData.form.markAsUntouched();
  }

  onUnselectTab(event) {
    this.activeItem = null;
    this.tabIndex = -1;
  }

  onClearModel(event) {
    this.clearValues();
  }
}
