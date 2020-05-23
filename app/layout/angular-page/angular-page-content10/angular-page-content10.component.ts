import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-angular-page-content10',
  templateUrl: './angular-page-content10.component.html',
  styleUrls: ['./angular-page-content10.component.scss']
})
export class AngularPageContent10Component implements OnInit {
  oneRowHeight = 28;
  githubLogoPath: string;
  defaultRows = 3;
  defaultRowHeight = this.defaultRows * this.oneRowHeight;
  customTextValue: string;
  fieldRequired: boolean;
  customTextMaxLength = 250;
  customTextMinLength = 0;
  maxHeightInRows = 10;
  maxHeightLimit = (this.oneRowHeight * this.maxHeightInRows);
  @ViewChild('dataEntryForm', {static: true} ) dataEntryForm: NgForm;

  constructor() { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }

  onSubmit(dataEntryForm: NgForm) {
    console.log('onSubmit fired ' + dataEntryForm);
  }

  onChangeSpinner(event: Event) {
    this.maxHeightLimit = (this.oneRowHeight * this.maxHeightInRows);
    console.log('onChangeSpinner fired ' + event);
  }
}

