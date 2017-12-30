import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-csharp-page-title',
  templateUrl: './csharp-page-title.component.html',
  styleUrls: ['./csharp-page-title.component.scss']
})
export class CsharpPageTitleComponent implements OnInit {
  public years: number;

  constructor() {
  }

  ngOnInit() {
    this.years = 1;
  }
}
