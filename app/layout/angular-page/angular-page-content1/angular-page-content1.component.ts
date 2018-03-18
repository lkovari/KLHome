import { Component, OnInit } from '@angular/core';
import * as angular from '@angular/forms';

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
  fullImagePathA5Rx: string;
  fullImagePrimeNg: string;
  fullImageAngularCompCommunication: string;
  fullImageAngularBestPractices: string;
  fullImageAngularRouter: string;
  fullImageAngularRouting: string;
  fullImageRxJs: string;
  angularVersion: any;

  constructor() {
    this.fullImagePathRF = 'assets/images/reactiveformsbydt.jpg';
    this.fullImagePathSCSS = 'assets/images/UC-XRLSVCSR.jpg';
    this.fullImagePathSASS = 'assets/images/UC-NLUM4IQ0.jpg';
    this.fullImagePathA5 = 'assets/images/UC-9GVOGJGJ.jpg';
    this.fullImagePathA5Rx = 'assets/images/a5RxJsReactiveProg.png';
    this.fullImagePrimeNg = 'assets/images/cert-primeng.png';
    this.fullImageAngularBestPractices = 'assets/images/angularbestpractices.png';
    this.fullImageAngularCompCommunication = 'assets/images/angular-component-comm.png';
    this.fullImageAngularRouter = 'assets/images/angularRouterUpAndRunning.png';
    this.fullImageAngularRouting = '';
    this.fullImageRxJs = '';
    }

  ngOnInit() {
    this.angularVersion = angular.VERSION.full;
  }

}
