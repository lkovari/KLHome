import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-angular-page-content5',
  templateUrl: './angular-page-content5.component.html',
  styleUrls: ['./angular-page-content5.component.scss']
})
export class AngularPageContent5Component implements OnInit {
  isSubmitted = false;
  githubLogoPath: string;
  formControlStatusKeys = ['status', 'dirty', 'pristine', 'touched', 'untouched', 'valid', 'invalid', 'value', 'errors'];
  tabItems: MenuItem[];
  activeItem: MenuItem;
  tabIndex: number;

  constructor() { }

  ngOnInit() {
    this.tabItems = [
      { label: 'Tab #1', icon: 'fa fa-fw fa-bar-chart', command: (event) => {
        this.tabItemChanged(0);
      }},
      {label: 'Tab #2', icon: 'fa fa-fw fa-calendar', command: (event) => {
        this.tabItemChanged(1);
      }},
      {label: 'Tab #3', icon: 'fa fa-fw fa-book', command: (event) => {
        this.tabItemChanged(2);
      }}
    ];
    this.activeItem = this.tabItems[1];
  }

  private tabItemChanged(ix: number) {
    this.activeItem = this.tabItems[ix];
    this.tabIndex = ix;
  }

}
