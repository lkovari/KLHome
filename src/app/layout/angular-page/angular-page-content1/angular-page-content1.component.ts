import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-page-content1',
  templateUrl: './angular-page-content1.component.html',
  styleUrls: ['./angular-page-content1.component.scss']
})
export class AngularPageContent1Component implements OnInit {
  fullImagePathRF: string;
  fullImagePathSCSS: string;
  fullImagePathSASS: string;
  fullImagePathA5: string;

  constructor() {
    this.fullImagePathRF = 'assets/images/reactiveformsbydt.jpg';
    this.fullImagePathSCSS = 'assets/images/UC-XRLSVCSR.jpg';
    this.fullImagePathSASS = 'assets/images/UC-NLUM4IQ0.jpg';
    this.fullImagePathA5 = 'assets/images/UC-9GVOGJGJ.jpg';
  }

  ngOnInit() {
  }

}
