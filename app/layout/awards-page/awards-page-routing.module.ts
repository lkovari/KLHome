/**
 * Created by Laszlo Kovary on 09/26/2019.
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AwardsContentComponent } from './awards-content.component';



const routes: Routes = [
  { path: '', component: AwardsContentComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AwardsPageRoutingModule { }
