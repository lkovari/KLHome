import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delphi-page-title',
  templateUrl: './delphi-page-title.component.html',
  styleUrls: ['./delphi-page-title.component.scss']
})
export class DelphiPageTitleComponent implements OnInit {
  public years: number;

  constructor() { }

  ngOnInit() {
    this.years = 2006 - 1998;
  }

}
