import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { VuejsPageContent0Component } from "./vuejs-page-content0/vuejs-page-content0.component";
import { VuejsPageTitleComponent } from "./vuejs-page-title.component";


const routes: Routes = [
    { path: '', component: VuejsPageTitleComponent, 
    children: [
        { path: 'vuejs-page-content0', component: VuejsPageContent0Component },
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VuejsPageRoutingModule { }