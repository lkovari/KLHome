import { Component, OnInit } from '@angular/core';
import * as angular from '@angular/forms';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  public years: number;
  constructor() {
  }

  ngOnInit() {
    const date = new Date();
    this.years = date.getFullYear();
    console.log('Angular v' + angular.VERSION.full);
  }

}
