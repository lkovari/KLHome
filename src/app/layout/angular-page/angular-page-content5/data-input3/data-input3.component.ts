import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { CustomFormModel } from '../custom-form-.model';

@Component({
  selector: 'app-data-input3',
  templateUrl: './data-input3.component.html',
  styleUrls: ['./data-input3.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DataInput3Component implements OnInit {
  @Input() customFormModel: CustomFormModel;
  @Output() dataChanged = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
    console.log('app-data-input3');
  }

  onChanged(event) {
    console.log('onChanged event arg ' + JSON.stringify(event) + ' customText3 ' + JSON.stringify(this.customFormModel.customText3));
  }

  onBlur(event) {
    console.log('onBlur event arg ' + JSON.stringify(event) + ' customText3 ' + JSON.stringify(this.customFormModel.customText3));
  }
}
