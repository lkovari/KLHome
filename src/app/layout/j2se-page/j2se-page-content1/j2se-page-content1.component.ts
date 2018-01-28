import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-j2se-page-content1',
  templateUrl: './j2se-page-content1.component.html',
  styleUrls: ['./j2se-page-content1.component.scss']
})
export class J2sePageContent1Component implements OnInit {
  public imagePathArray = ['https://lkovari.github.io/KLHome/assets/images/dev-j2se-dtpicket.jpg',
        'https://lkovari.github.io/KLHome/assets/images/dev-j2se-dpicker.jpg',
        'https://lkovari.github.io/KLHome/assets/images/dev-j2se-tpicker.jpg'
      ];

  constructor() { }

  ngOnInit() {
  }

}
