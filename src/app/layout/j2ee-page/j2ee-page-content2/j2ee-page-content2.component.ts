import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-j2ee-page-content2',
  templateUrl: './j2ee-page-content2.component.html',
  styleUrls: ['./j2ee-page-content2.component.scss']
})
export class J2eePageContent2Component implements OnInit {
  public imagePathArray = ['assets/images/dev-j2ee-wordbook01.jpg', 'assets/images/dev-j2ee-wordbook02.jpg'];

  constructor() { }

  ngOnInit() {
  }

}
