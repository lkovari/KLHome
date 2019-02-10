import { Component, OnInit, Input } from '@angular/core';
import { CustomFormModel } from '../custom-form-.model';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-data-input1',
  templateUrl: './data-input1.component.html',
  styleUrls: ['./data-input1.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DataInput1Component implements OnInit {
  @Input() customFormModel: CustomFormModel;

  constructor() { }

  ngOnInit() {
    console.log('app-data-input1');
  }

  onChanged(event) {
    console.log('onChanged event arg ' + JSON.stringify(event) + ' customText1 ' + JSON.stringify(this.customFormModel.customText1));
  }

  onBlur(event) {
    console.log('onBlur event arg ' + JSON.stringify(event) + ' customText1 ' + JSON.stringify(this.customFormModel.customText1));
  }
}

