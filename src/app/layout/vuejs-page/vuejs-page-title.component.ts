import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vuejs-page-title',
  templateUrl: './vuejs-page-title.component.html',
  styleUrls: ['./vuejs-page-title.component.scss']
})
export class VuejsPageTitleComponent implements OnInit {
  public years: number;

    constructor() {
    }

    ngOnInit() {
      const date = new Date();
      this.years = date.getFullYear() - 2022;
    }

}
