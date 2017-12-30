import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-j2ee-page-title',
  templateUrl: './j2ee-page-title.component.html',
  styleUrls: ['./j2ee-page-title.component.scss']
})
export class J2eePageTitleComponent implements OnInit {
  public years: number;

  constructor() {
  }

  ngOnInit() {
    this.years = 1;
  }
}
