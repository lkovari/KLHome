import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-j2se-page-content3',
  templateUrl: './j2se-page-content3.component.html',
  styleUrls: ['./j2se-page-content3.component.scss']
})
export class J2sePageContent3Component implements OnInit {
  githubLogoPath;
  constructor() { }

  ngOnInit() {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }

}
