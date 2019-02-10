import { Component, OnInit, Input } from '@angular/core';
import { CustomFormModel } from '../custom-form-.model';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-data-input2',
  templateUrl: './data-input2.component.html',
  styleUrls: ['./data-input2.component.scss'],
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm } ]
})
export class DataInput2Component implements OnInit {
  @Input() customFormModel: CustomFormModel;

  constructor() { }

  ngOnInit() {
    console.log('app-data-input2');
  }

  onChanged(event) {
    console.log('onChanged event arg ' + JSON.stringify(event) + ' customText2 ' + JSON.stringify(this.customFormModel.customText2));
  }

  onBlur(event) {
    console.log('onBlur event arg ' + JSON.stringify(event) + ' customText2 ' + JSON.stringify(this.customFormModel.customText2));
  }
}
