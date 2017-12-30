import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-page-content1',
  templateUrl: './angular-page-content1.component.html',
  styleUrls: ['./angular-page-content1.component.scss']
})
export class AngularPageContent1Component implements OnInit {
  fullImagePathSCSS: string;
  fullImagePathSASS: string;
  constructor() { 
    this.fullImagePathSCSS = 'assets/images/UC-XRLSVCSR.jpg';
    this.fullImagePathSASS = 'assets/images/UC-NLUM4IQ0.jpg';
  }

  ngOnInit() {
  }

}
