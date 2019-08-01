import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form1',
  templateUrl: './sub-form1.component.html',
  styleUrls: ['./sub-form1.component.scss']
})
export class SubForm1Component implements OnInit {
  minLength = 7;
  inputMask = '99999?-9999';
  placeholder = '99999-9999';
  private _formPartTab: FormGroup;
  @Input()
  set formPartTab(v: FormGroup) {
    this._formPartTab = v;
  }

  get formPartTab(): FormGroup {
    return this._formPartTab;
  }

  constructor() { }

  ngOnInit() {
    console.log('ngOnInit');
  }

}
