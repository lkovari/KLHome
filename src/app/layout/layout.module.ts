import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { HeaderComponent } from '../shared/components/header/header.component';

import { WelcomePageModule } from './welcome-page/welcome-page.module';
import { AboutmePageModule } from './aboutme-page/aboutme-page.module';
import { AngularPageModule } from './angular-page/angular-page.module';
import { JavascriptPageModule } from './javascript-page/javascript-page.module';
import { IosPageModule } from './ios-page/ios-page.module';
import { AndroidPageModule } from './android-page/android-page.module';
import { J2eePageModule } from './j2ee-page/j2ee-page.module';
import { J2sePageModule } from './j2se-page/j2se-page.module';
import { CsharpPageModule } from './csharp-page/csharp-page.module';
import { DelphiPageModule } from './delphi-page/delphi-page.module';
import { MasmPageModule } from './masm-page/masm-page.module';
import { SharedModule } from '../shared/shared.module';
import { AwardsPageModule } from './awards-page/awards-page.module';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  imports: [
    CommonModule,
    NgbDropdownModule,
    SharedModule,
    LayoutRoutingModule,
    WelcomePageModule,
    AboutmePageModule,
    AwardsPageModule,
    AngularPageModule,
    JavascriptPageModule,
    IosPageModule,
    AndroidPageModule,
    J2eePageModule,
    J2sePageModule,
    CsharpPageModule,
    DelphiPageModule,
    MasmPageModule,
    DialogModule,
    NgbModule
   ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidebarComponent
  ],
  exports: []
})
export class LayoutModule { }
