import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ios-page-title',
  templateUrl: './ios-page-title.component.html',
  styleUrls: ['./ios-page-title.component.scss']
})
export class IosPageTitleComponent implements OnInit {
  public years: number;

  constructor() {
  }

  ngOnInit() {
    this.years = 1;
  }
}
