/**
 * Created by lkovari on 2018.02.08.
 */
import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-angular-page-content2',
  templateUrl: './angular-page-content2.component.html',
  styleUrls: ['./angular-page-content2.component.scss']
})
export class AngularPageContent2Component implements OnInit {
  @ViewChild('formData') formData: NgForm;
  customDate: Date;
  selectedDate: Date;
  customText: string;
  minLength = 7;
  submitted = false;

  form_data = {
    customcalendar: '',
    customtextinput: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onDateSelected(event) {
    this.selectedDate = event;
    console.log('onDateSelected ' + event);
  }

  onDateClear(date: Date) {
    this.selectedDate = date;
    console.log('onDateClear ' + date);

  }

  onModelChanged(event) {
    this.selectedDate = event;
    console.log('onModelChanged ' + event);
  }

  onSetCustomDate(event) {
    this.customDate = new Date('02/02/1965');
  }

  setValues(form) {
    this.formData.form.setValue(
      // this.formData.form.patchValue(
      {
        customcalendar: new Date('02/02/1993'),
        customtextinput: 'abraka'
      }
    );
    Object.keys( this.formData.controls).forEach(key => {
      this.formData.controls[key].markAsDirty();
      this.formData.controls[key].markAsTouched();
    });
    /* we can use individually also
    (this.formData.form.controls['pdropdown'] as FormControl).markAsDirty();
    */
  }

  clearValues(form) {
    this.formData.form.setValue(
      {
        customcalendar: null,
        customtextinput: ''
      }
    );
    Object.keys( this.formData.controls).forEach(key => {
      this.formData.controls[key].markAsPristine();
      this.formData.controls[key].markAsUntouched();
    });
  }

  onSubmit(userForm: NgForm) {
    this.submitted = true;
    this.form_data.customcalendar = this.formData.value.customcalendar;
    this.form_data.customtextinput = this.formData.value.customtextinput;
    // reset the form same as when reloaded
    this.formData.reset();
    console.log(this.formData);
  }
}
