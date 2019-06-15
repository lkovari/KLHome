import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form3',
  templateUrl: './sub-form3.component.html',
  styleUrls: ['./sub-form3.component.scss']
})
export class SubForm3Component implements OnInit {
  minLength = 7;
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
