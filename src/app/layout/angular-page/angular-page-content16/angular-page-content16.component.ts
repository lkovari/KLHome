import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { SolidPrincipleKind } from './solid-principle-kind.enum';

@Component({
  selector: 'app-angular-page-content16',
  templateUrl: './angular-page-content16.component.html',
  styleUrls: ['./angular-page-content16.component.scss']
})
export class AngularPageContent16Component implements OnInit {
  githubLogoPath: string;
  patternsMenu: MenuItem[];
  SINGLE_RESPONSIBILITY = SolidPrincipleKind.S;
  OPEN_CLOSE = SolidPrincipleKind.O;
  LISKOV_SUBSTITUTION = SolidPrincipleKind.L;
  INTERFACE_SEGREGATION = SolidPrincipleKind.I;
  DEPENDENCY_INVERSION = SolidPrincipleKind.D;

  constructor() { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
  }

}
