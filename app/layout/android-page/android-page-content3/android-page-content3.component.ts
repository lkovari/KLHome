import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-android-page-content3',
  templateUrl: './android-page-content3.component.html',
  styleUrls: ['./android-page-content3.component.scss']
})
export class AndroidPageContent3Component implements OnInit {
  public imagePathArray = ['assets/images/dev-and-sen-01.jpg', 'assets/images/dev-and-sen-02.jpg', 'assets/images/dev-and-sen-03.jpg'];

  constructor() { }

  ngOnInit() {
  }

}
