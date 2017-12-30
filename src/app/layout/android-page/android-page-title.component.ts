import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-android-page-title',
  templateUrl: './android-page-title.component.html',
  styleUrls: ['./android-page-title.component.scss']
})
export class AndroidPageTitleComponent implements OnInit {
  public years: number;

  constructor() { }

  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear() - 2010;
  }

}
