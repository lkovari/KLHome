import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-angular-page-content16',
  templateUrl: './angular-page-content16.component.html',
  styleUrls: ['./angular-page-content16.component.scss']
})
export class AngularPageContent16Component implements OnInit {
  githubLogoPath: string;
  patternsMenu: MenuItem[];

  constructor() { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }


}
