import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-android-page-content4',
  templateUrl: './android-page-content4.component.html',
  styleUrls: ['./android-page-content4.component.scss']
})
export class AndroidPageContent4Component implements OnInit {
  public imagePathArray = ['assets/images/dev-and-mnb-01.jpg', 'assets/images/dev-and-mnb-02.jpg',
                          'assets/images/dev-and-mnb-03.jpg', 'assets/images/dev-and-mnb-04.jpg'];

  constructor() { }

  ngOnInit() {
  }

}
