import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form2',
  templateUrl: './sub-form2.component.html',
  styleUrls: ['./sub-form2.component.scss']
})
export class SubForm2Component implements OnInit {
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

  logZipCodeStatus(): boolean {
    console.log(`Status ${this.formPartTab?.get('zipCode')?.status}`);
    return true;
  }
}
