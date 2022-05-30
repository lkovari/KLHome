/**
 * Created by Laszlo Kovary on 4/13/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonDataResolver } from 'src/app/shared/services/persondataresolver/person-data-resolver.service';
import { AngularPageContent0Component } from './angular-page-content0/angular-page-content0.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';
import { AngularPageContent10Component } from './angular-page-content10/angular-page-content10.component';
import { AngularPageContent11Component } from './angular-page-content11/angular-page-content11.component';
import { AngularPageContent12Component } from './angular-page-content12/angular-page-content12.component';
import { AngularPageContent13Component } from './angular-page-content13/angular-page-content13.component';
import { AngularPageContent14Component } from './angular-page-content14/angular-page-content14.component';
import { AngularPageContent15Component } from './angular-page-content15/angular-page-content15.component';
import { AngularPageContent1rComponent } from './angular-page-content1r/angular-page-content1r.component';
import { AngularPageContent2Component } from './angular-page-content2/angular-page-content2.component';
import { AngularPageContent3Component } from './angular-page-content3/angular-page-content3.component';
import { AngularPageContent4Component } from './angular-page-content4/angular-page-content4.component';
import { AngularPageContent5Component } from './angular-page-content5/angular-page-content5.component';
import { AngularPageContent6Component } from './angular-page-content6/angular-page-content6.component';
import { AngularPageContent7Component } from './angular-page-content7/angular-page-content7.component';
import { AngularPageContent8Component } from './angular-page-content8/angular-page-content8.component';
import { AngularPageContent9Component } from './angular-page-content9/angular-page-content9.component';

import { AngularPageTitleComponent } from './angular-page-title.component';

const routes: Routes = [
  { path: '', component: AngularPageTitleComponent, 
  children: [
    // !!!!!!! Should be use loadChildren for lazy load
    {path: 'angular-page-content0', component: AngularPageContent0Component},
    {path: 'angular-page-content1', component: AngularPageContent1Component},
    {path: 'angular-page-content1r', component: AngularPageContent1rComponent},
    {path: 'angular-page-content2', component: AngularPageContent2Component},
    {path: 'angular-page-content3', component: AngularPageContent3Component},
    {path: 'angular-page-content4', component: AngularPageContent4Component},
    {path: 'angular-page-content5', component: AngularPageContent5Component},
    {path: 'angular-page-content6', component: AngularPageContent6Component},
    {path: 'angular-page-content7', component: AngularPageContent7Component},
    {path: 'angular-page-content8', component: AngularPageContent8Component, resolve: { resolvedPersonData: PersonDataResolver }},
    {path: 'angular-page-content9', component: AngularPageContent9Component},
    {path: 'angular-page-content10', component: AngularPageContent10Component},
    {path: 'angular-page-content11', component: AngularPageContent11Component},
    {path: 'angular-page-content12', component: AngularPageContent12Component},
    {path: 'angular-page-content13', component: AngularPageContent13Component},
    {path: 'angular-page-content14', component: AngularPageContent14Component},
    {path: 'angular-page-content15', component: AngularPageContent15Component}
  ]}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularPageRoutingModule { }
