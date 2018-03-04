import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-android-page-content1',
  templateUrl: './android-page-content1.component.html',
  styleUrls: ['./android-page-content1.component.scss']
})
export class AndroidPageContent1Component implements OnInit {
  // Carousel images
  public carouselControlLeftArrow: string;
  public carouselControlRightArrow: string;
  // for direct access to the DOM
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
