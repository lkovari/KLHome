import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-masm-page-title',
  templateUrl: './masm-page-title.component.html',
  styleUrls: ['./masm-page-title.component.scss']
})
export class MasmPageTitleComponent implements OnInit {
  public years: number;

  constructor() { }

  ngOnInit() {
    this.years = 1992 - 1983;
  }

}
