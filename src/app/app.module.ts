import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        SharedModule
    ],
  // prevent 404 Forbidden error when refresh the page
  // https://stackoverflow.com/questions/35284988/angular-2-404-error-occur-when-i-refresh-through-the-browser
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
