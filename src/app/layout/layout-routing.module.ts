/**
 * Created by LKovari on 4/11/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

import { AngularPageTitleComponent } from './angular-page/angular-page-title.component';
import { AngularPageContent1Component } from './angular-page/angular-page-content1/angular-page-content1.component';
import { AngularPageContent2Component } from './angular-page/angular-page-content2/angular-page-content2.component';
import { AngularPageContent3Component } from './angular-page/angular-page-content3/angular-page-content3.component';

import { JavascriptPageTitleComponent } from './javascript-page/javascript-page-title.component';
import { JavascriptPageContent1Component } from './javascript-page/javascript-page-content1/javascript-page-content1.component';
import { JavascriptPageContent2Component } from './javascript-page/javascript-page-content2/javascript-page-content2.component';

import { IosPageTitleComponent } from './ios-page/ios-page-title.component';
import { IosPageContent1Component } from './ios-page/ios-page-content1/ios-page-content1.component';
import { IosPageContent2Component } from './ios-page/ios-page-content2/ios-page-content2.component';

import { AndroidPageTitleComponent } from 'app/layout/android-page/android-page-title.component';
import { AndroidPageContent1Component } from './android-page/android-page-content1/android-page-content1.component';
import { AndroidPageContent2Component } from './android-page/android-page-content2/android-page-content2.component';
import { AndroidPageContent3Component } from './android-page/android-page-content3/android-page-content3.component';
import { AndroidPageContent4Component } from './android-page/android-page-content4/android-page-content4.component';
import { AndroidPageContent5Component } from './android-page/android-page-content5/android-page-content5.component';

import { J2eePageTitleComponent } from './j2ee-page/j2ee-page-title.component';
import { J2eePageContent1Component } from './j2ee-page/j2ee-page-content1/j2ee-page-content1.component';
import { J2eePageContent2Component } from './j2ee-page/j2ee-page-content2/j2ee-page-content2.component';

import { J2sePageTitleComponent } from './j2se-page/j2se-page-title.component';
import { J2sePageContent1Component } from './j2se-page/j2se-page-content1/j2se-page-content1.component';
import { J2sePageContent2Component } from './j2se-page/j2se-page-content2/j2se-page-content2.component';
import { J2sePageContent3Component } from './j2se-page/j2se-page-content3/j2se-page-content3.component';

import { CsharpPageTitleComponent } from './csharp-page/csharp-page-title.component';
import { CsharpPageContent1Component } from './csharp-page/csharp-page-content1/csharp-page-content1.component';
import { CsharpPageContent2Component } from './csharp-page/csharp-page-content2/csharp-page-content2.component';

import { DelphiPageTitleComponent } from './delphi-page/delphi-page-title.component';
import { DelphiPageContent1Component } from './delphi-page/delphi-page-content1/delphi-page-content1.component';
import { DelphiPageContent2Component } from './delphi-page/delphi-page-content2/delphi-page-content2.component';
import { DelphiPageContent3Component } from './delphi-page/delphi-page-content3/delphi-page-content3.component';
import { DelphiPageContent4Component } from './delphi-page/delphi-page-content4/delphi-page-content4.component';

import { MasmPageTitleComponent } from './masm-page/masm-page-title.component';
import { MasmPageContent1Component } from './masm-page/masm-page-content1/masm-page-content1.component';
import { MasmPageContent2Component } from './masm-page/masm-page-content2/masm-page-content2.component';
import { WelcomePageComponent } from 'app/layout/welcome-page/welcome-page.component';
import { AboutmeContentComponent } from 'app/layout/aboutme-page/aboutme-content.component';
import { AngularPageContent4Component } from './angular-page/angular-page-content4/angular-page-content4.component';
import { AngularPageContent5Component } from './angular-page/angular-page-content5/angular-page-content5.component';
import { AngularPageContent6Component } from './angular-page/angular-page-content6/angular-page-content6.component';
import { AngularPageContent7Component } from './angular-page/angular-page-content7/angular-page-content7.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      // {path: 'welcome-page', loadChildren: './welcome-page/welcome-page.module#WelcomePageModule'},
      {path: 'welcome-page', component: WelcomePageComponent},

      {path: 'aboutme-page', component: AboutmeContentComponent},

      {path: 'angular-page', component: AngularPageTitleComponent,
        children: [
          {path: 'angular-page-content1', component: AngularPageContent1Component},
          {path: 'angular-page-content2', component: AngularPageContent2Component},
          {path: 'angular-page-content3', component: AngularPageContent3Component},
          {path: 'angular-page-content4', component: AngularPageContent4Component},
          {path: 'angular-page-content5', component: AngularPageContent5Component},
          {path: 'angular-page-content6', component: AngularPageContent6Component},
          {path: 'angular-page-content7', component: AngularPageContent7Component}
        ]
      },
      {path: 'javascript-page', component: JavascriptPageTitleComponent,
        children: [
          {path: 'javascript-page-content1', component: JavascriptPageContent1Component},
          {path: 'javascript-page-content2', component: JavascriptPageContent2Component}
        ]
      },

      {path: 'ios-page', component: IosPageTitleComponent,
        children: [
          {path: 'ios-page-content1', component: IosPageContent1Component},
          {path: 'ios-page-content2', component: IosPageContent2Component}
        ]
      },

      {path: 'android-page', component: AndroidPageTitleComponent,
        children: [
          {path: 'android-page-content1', component: AndroidPageContent1Component},
          {path: 'android-page-content2', component: AndroidPageContent2Component},
          {path: 'android-page-content3', component: AndroidPageContent3Component},
          {path: 'android-page-content4', component: AndroidPageContent4Component},
          {path: 'android-page-content5', component: AndroidPageContent5Component}
        ]
      },

      {path: 'j2ee-page', component: J2eePageTitleComponent,
        children: [
          {path: 'j2ee-page-content1', component: J2eePageContent1Component},
          {path: 'j2ee-page-content2', component: J2eePageContent2Component}
        ]
      },

      {path: 'j2se-page', component: J2sePageTitleComponent,
        children: [
          {path: 'j2se-page-content1', component: J2sePageContent1Component},
          {path: 'j2se-page-content2', component: J2sePageContent2Component},
          {path: 'j2se-page-content3', component: J2sePageContent3Component}
        ]
      },

      {path: 'csharp-page', component: CsharpPageTitleComponent,
        children: [
          {path: 'csharp-page-content1', component: CsharpPageContent1Component},
          {path: 'csharp-page-content2', component: CsharpPageContent2Component}
        ]
      },

      {path: 'delphi-page', component: DelphiPageTitleComponent,
        children: [
          {path: 'delphi-page-content1', component: DelphiPageContent1Component},
          {path: 'delphi-page-content2', component: DelphiPageContent2Component},
          {path: 'delphi-page-content3', component: DelphiPageContent3Component},
          {path: 'delphi-page-content4', component: DelphiPageContent4Component}
        ]
      },
      /*
      {path: 'masm-page', component: MasmPageTitleComponent,
        children: [
          {path: 'masm-page-content1', component: MasmPageContent1Component},
          {path: 'masm-page-content2', component: MasmPageContent2Component}
        ]
      }
      */
     { path: 'masm-page', loadChildren: './masm-page/masm-page.module#MasmPageModule' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
