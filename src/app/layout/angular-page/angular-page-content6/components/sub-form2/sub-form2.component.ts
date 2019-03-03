import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sub-form2',
  templateUrl: './sub-form2.component.html',
  styleUrls: ['./sub-form2.component.scss']
})
export class SubForm2Component implements OnInit {
  private _formPartTab: FormGroup;
  @Input()
  set formPartTab(v: FormGroup) {
    this._formPartTab = v;
  }

  get formPartTab(): FormGroup {
    return this._formPartTab;
  }

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    console.log('ngOnInit');
  }
}
