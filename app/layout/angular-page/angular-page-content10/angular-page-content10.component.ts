import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-angular-page-content10',
  templateUrl: './angular-page-content10.component.html',
  styleUrls: ['./angular-page-content10.component.scss']
})
export class AngularPageContent10Component implements OnInit {
  githubLogoPath: string;
  defaultRows = 3;
  customTextValue: string;
  fieldRequired: boolean;
  customTextMaxLength = 250;
  customTextMinLength = 0;
  maxRowstLimit = 10;
  @ViewChild('dataEntryForm', {static: true} ) dataEntryForm: NgForm;

  constructor() { }

  ngOnInit(): void {
    this.customTextValue = '';
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }

  onSubmit(dataEntryForm: NgForm) {
    console.log('onSubmit fired ' + dataEntryForm);
  }

  onChangeSpinner(event: Event) {
    console.log('onChangeSpinner fired ' + event);
  }
}

