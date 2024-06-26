import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PreventRightClickService } from 'src/app/shared/services/preventrightclickservice/prevent-right-click.service';
import { SolidPrincipleKind } from './solid-principle-kind.enum';

@Component({
  selector: 'app-angular-page-content16',
  templateUrl: './angular-page-content16.component.html',
  styleUrls: ['./angular-page-content16.component.scss']
})
export class AngularPageContent16Component implements OnInit, OnDestroy {
  githubLogoPath: string;
  patternsMenu: MenuItem[];
  SINGLE_RESPONSIBILITY = SolidPrincipleKind.S;
  OPEN_CLOSE = SolidPrincipleKind.O;
  LISKOV_SUBSTITUTION = SolidPrincipleKind.L;
  INTERFACE_SEGREGATION = SolidPrincipleKind.I;
  DEPENDENCY_INVERSION = SolidPrincipleKind.D;

  constructor(private preventRightClickService: PreventRightClickService) { }

  ngOnInit(): void {
    this.githubLogoPath = 'assets/githubmark/GitHub-Mark-32px.png';
    this.preventRightClickService.preventRightClick();
  }

  ngOnDestroy(): void {
    this.preventRightClickService.allowRightClick();
  }
}
