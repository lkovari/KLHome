import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-delphi-page-content1',
  templateUrl: './delphi-page-content1.component.html',
  styleUrls: ['./delphi-page-content1.component.scss']
})
export class DelphiPageContent1Component implements OnInit {
  carouselControlLeftArrow: string;
  carouselControlRightArrow: string;
  crsl: any;

  constructor(domElement: ElementRef) {
    // Reference : https://angular.io/docs/js/latest/api/core/index/ElementRef-class.html
    this.crsl = domElement.nativeElement.querySelector('carousel');
  }

  ngOnInit() {
    // set carousel left and right control images
    this.carouselControlLeftArrow = 'assets/images/carousel_control_left.png';
    this.carouselControlRightArrow = 'assets/images/carousel_control_right.png';

    if (this.crsl != null) {
      this.crsl.interval = 4000;
    }
  }

}
