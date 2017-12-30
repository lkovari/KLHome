import { Component, OnInit } from '@angular/core';
import { PageHeaderModule } from './../../shared/index';

@Component({
  selector: 'app-angular-page-title',
  templateUrl: './angular-page-title.component.html',
  styleUrls: ['./angular-page-title.component.scss']
})
export class AngularPageTitleComponent implements OnInit {
  public years: number;
  
    constructor() {
    }
  
    ngOnInit() {
      const date = new Date();
      this.years = date.getFullYear() - 2017;
    }
}
