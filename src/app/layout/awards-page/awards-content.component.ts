import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-awards-content',
  templateUrl: './awards-content.component.html',
  styleUrls: ['./awards-content.component.scss']
})
export class AwardsContentComponent implements OnInit {
  public years: number;
  constructor() { }

  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear();
  }

}
