import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './welcome-page.component';
import {WelcomePageRoutingModule} from './welcome-page-routing-module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot() ,
    WelcomePageRoutingModule
  ],
  declarations: [WelcomePageComponent]
})
export class WelcomePageModule { }
