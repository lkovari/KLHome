import { Component, OnInit } from '@angular/core';
import { CustomFormModel } from './custom-form-.model';

@Component({
  selector: 'app-angular-page-content5',
  templateUrl: './angular-page-content5.component.html',
  styleUrls: ['./angular-page-content5.component.scss']
})
export class AngularPageContent5Component implements OnInit {

  customFormModel: CustomFormModel;

  constructor() { }

  ngOnInit() {
    this.customFormModel = new CustomFormModel();
  }
}
