import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-j2se-page-content1',
  templateUrl: './j2se-page-content1.component.html',
  styleUrls: ['./j2se-page-content1.component.scss']
})
export class J2sePageContent1Component implements OnInit {
  public imagePathArray = ['assets/images/dev-j2se-dtpicket.jpg', 'assets/images/dev-j2se-dpicker.jpg', 'assets/images/dev-j2se-tpicker.jpg'];

  constructor() { }

  ngOnInit() {
  }

}
