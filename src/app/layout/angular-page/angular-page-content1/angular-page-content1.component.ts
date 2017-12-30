import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-page-content1',
  templateUrl: './angular-page-content1.component.html',
  styleUrls: ['./angular-page-content1.component.scss']
})
export class AngularPageContent1Component implements OnInit {
  fullImagePath: string;
  constructor() { 
    this.fullImagePath = 'assets/images/UC-XRLSVCSR.jpg';
  }

  ngOnInit() {
  }

}
