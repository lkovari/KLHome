/**
 * Created by LKovari on 4/13/2017.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutmeContentComponent } from './aboutme-content.component';



const routes: Routes = [
  { path: '', component: AboutmeContentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutmePageRoutingModule { }
