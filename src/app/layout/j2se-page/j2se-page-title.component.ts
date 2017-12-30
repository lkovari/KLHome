import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-j2se-page-title',
  templateUrl: './j2se-page-title.component.html',
  styleUrls: ['./j2se-page-title.component.scss']
})
export class J2sePageTitleComponent implements OnInit {
  public years: number;

  constructor() {
  }

  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear() - 2004;
  }
}
