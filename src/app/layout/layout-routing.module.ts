/**
 * Created by Laszlo Kovary on 4/11/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

import { JavascriptPageTitleComponent } from './javascript-page/javascript-page-title.component';
import { JavascriptPageContent1Component } from './javascript-page/javascript-page-content1/javascript-page-content1.component';
import { JavascriptPageContent2Component } from './javascript-page/javascript-page-content2/javascript-page-content2.component';

import { IosPageTitleComponent } from './ios-page/ios-page-title.component';
import { IosPageContent1Component } from './ios-page/ios-page-content1/ios-page-content1.component';
import { IosPageContent2Component } from './ios-page/ios-page-content2/ios-page-content2.component';

import { AndroidPageTitleComponent } from './android-page/android-page-title.component';
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

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { AboutmeContentComponent } from './aboutme-page/aboutme-content.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      // {path: 'welcome-page', loadChildren: './welcome-page/welcome-page.module#WelcomePageModule'},
      {path: 'welcome-page', component: WelcomePageComponent},
      // !!!!!!! Should be use loadChildren for lazy load
      {path: 'aboutme-page', component: AboutmeContentComponent},

      // {path: 'awards-page', component: AwardsContentComponent},
      { path: 'awards-page', loadChildren: () => import('./awards-page/awards-page.module').then(m => m.AwardsPageModule) },

      {path: 'angular-page', loadChildren: () => import('./angular-page/angular-page.module').then(m => m.AngularPageModule) },
      
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
     { path: 'masm-page', loadChildren: () => import('./masm-page/masm-page.module').then(m => m.MasmPageModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
