import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-javascript-page-title',
  templateUrl: './javascript-page-title.component.html',
  styleUrls: ['./javascript-page-title.component.scss']
})
export class JavascriptPageTitleComponent implements OnInit {
  public years: number;

  constructor() {
  }

  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear() - 2016;
  }
}
