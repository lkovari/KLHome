/**
 * Created by Laszlo kovary on 2018.02.08.
 */
import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-angular-page-content2',
  templateUrl: './angular-page-content2.component.html',
  styleUrls: ['./angular-page-content2.component.scss']
})
export class AngularPageContent2Component implements OnInit, AfterViewInit {
  @ViewChild('dataEntryForm', { static: true }) dataEntryForm: NgForm | null;
  customDate: Date;
  selectedDate: Date;
  customText: string;
  public minLength = 7;
  submitted = false;
  githubLogoPath: string;
  minAllowedDate = new Date();
  maxAllowedDate = new Date();
  minDate = new Date();
  maxDate = new Date();
  changedFormContent = '';

  form_data = {
    customcalendar: '',
    customtextinput: ''
  };

  constructor() { }

  ngOnInit() {
    this.minDate.setFullYear(1965);
    this.minDate.setMonth(1);
    this.minDate.setDate(2);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() + 1);
    this.maxDate.setMonth(1);
    this.maxDate.setDate(2);
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    // TODO !!!!!!! Should be implement, between max allowed date range is selectable, but valid between minDate and maxDate
    Object.assign(this.minAllowedDate, this.minDate);
    this.minAllowedDate.setFullYear(this.minAllowedDate.getFullYear() - 2);
    Object.assign(this.maxAllowedDate, this.maxDate);
    this.maxAllowedDate.setFullYear(this.maxAllowedDate.getFullYear() + 2);
  }

  ngAfterViewInit() {
    this.dataEntryForm?.valueChanges?.subscribe(v => {
      this.changedFormContent = v
      console.log(this.changedFormContent);
    });
}

  onClearClicked(event) {
    const date = <Date>event;
    this.selectedDate = date;
    console.log('onClearClicked event arg ' + JSON.stringify(date) + ' customDate ' + JSON.stringify(this.customDate));
  }

  onTodayClicked(event) {
    const date = <Date>event;
    this.selectedDate = date;
    console.log('onTodayClicked event arg ' + JSON.stringify(date) + ' customDate ' + JSON.stringify(this.customDate));
  }

  onDateSelected(event) {
    const date = <Date>event;
    this.selectedDate = date;
    console.log('onDateSelected event arg ' + JSON.stringify(date) + ' customDate ' + JSON.stringify(this.customDate));
  }

  onModelChanged(event) {
    const date = <Date>event;
    this.selectedDate = date;
    console.log('onModelChanged event arg ' + JSON.stringify(date) + ' customDate ' + JSON.stringify(this.customDate));
  }

  onChanged(event) {
    console.log('onChanged event arg ' + JSON.stringify(event) + ' customText ' + JSON.stringify(this.customText));
  }


  onBlur(event) {
    console.log('onBlur event arg ' + JSON.stringify(event) + ' customText ' + JSON.stringify(this.customText));
  }

  onSetValues(form: NgForm) {
    this.dataEntryForm?.form.setValue(
      // this.dataEntryForm.form.patchValue(
      {
        customcalendar: new Date('02/02/1993'),
        customtextinput: 'abraka'
      }
    );
    Object.keys(this.dataEntryForm!.controls).forEach(key => {
      this.dataEntryForm?.controls[key].markAsDirty();
      this.dataEntryForm?.controls[key].markAsTouched();
    });
    /* we can use individually also
    (this.dataEntryForm.form.controls['pdropdown'] as FormControl).markAsDirty();
    */
   console.log('setValues click event fired ' + form.status);
  }

  onClearValues(form: NgForm) {
    this.dataEntryForm?.form.setValue(
      {
        customcalendar: null,
        customtextinput: ''
      }
    );
    Object.keys(this.dataEntryForm!.controls).forEach(key => {
      this.dataEntryForm?.controls[key].reset();
      this.dataEntryForm?.controls[key].updateValueAndValidity();
      this.dataEntryForm?.controls[key].markAsPristine();
      this.dataEntryForm?.controls[key].markAsUntouched();
    });
    this.dataEntryForm?.reset();
    // TODO !!!!!!! when displayed the UI, set the values with the button, after it, set a date value and clear
    // it, the red border remains to sign validation error but the field is empty
    console.log('clearValues click event fired ' + form.status);
  }

  extractData() {
    return this.changedFormContent;
  }

  onSubmit(userForm: NgForm) {
    this.submitted = true;
    this.form_data.customcalendar = this.dataEntryForm?.value.customcalendar;
    this.form_data.customtextinput = this.dataEntryForm?.value.customtextinput;
    // reset the form same as when reloaded
    this.dataEntryForm?.reset();
    console.log('onSubmit fired ' + userForm.status);
  }
}
