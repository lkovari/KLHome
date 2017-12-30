import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-j2se-page-content2',
  templateUrl: './j2se-page-content2.component.html',
  styleUrls: ['./j2se-page-content2.component.scss']
})
export class J2sePageContent2Component implements OnInit {
  // Carousel images
  public carouselControlLeftArrow: string;
  public carouselControlRightArrow: string;
  // for direct access to the DOM
  crsl: any;

  constructor(domElement: ElementRef) {
    // set carousel left and right control images
    this.carouselControlLeftArrow = 'assets/images/carousel_control_left.png';
    this.carouselControlRightArrow = 'assets/images/carousel_control_right.png';
    // Reference : https://angular.io/docs/js/latest/api/core/index/ElementRef-class.html
    this.crsl = domElement.nativeElement.querySelector('carousel');
    if (this.crsl != null) {
      this.crsl.interval = 4000;
    }
  }

  ngOnInit() {
  }

}
