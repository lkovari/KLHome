/**
 * Created by LKovari on 4/12/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {WelcomePageComponent} from './welcome-page.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomePageRoutingModule { }
