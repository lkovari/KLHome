import {Component, OnInit} from '@angular/core';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-j2se-page-content2',
  templateUrl: './j2se-page-content2.component.html',
  styleUrls: ['./j2se-page-content2.component.scss'],
  providers: [ NgbCarouselConfig ]
})
export class J2sePageContent2Component implements OnInit {

  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 5000;
    config.wrap = false;
    config.keyboard = false;
  }

  ngOnInit() {
  }

}
