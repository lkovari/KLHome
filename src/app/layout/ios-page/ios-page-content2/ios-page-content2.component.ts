import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ios-page-content2',
  templateUrl: './ios-page-content2.component.html',
  styleUrls: ['./ios-page-content2.component.css']
})
export class IosPageContent2Component implements OnInit {
  public imagePathArray = ['assets/images/dev-objc-calc_ui_1.jpg', 'assets/images/dev-objc-calc_ui_2.jpg'];

  constructor() { }

  ngOnInit() {
  }


}
