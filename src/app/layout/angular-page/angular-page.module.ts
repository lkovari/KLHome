import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'app/shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { AngularPageTitleComponent } from './angular-page-title.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';
import { AngularPageRoutingModule } from './angular-page-routing.module';
import { AngularPageContent2Component } from './angular-page-content2/angular-page-content2.component';
import { AngularPageContent3Component } from './angular-page-content3/angular-page-content3.component';
import { AngularPageContent4Component } from './angular-page-content4/angular-page-content4.component';
import { AngularPageContent5Component } from './angular-page-content5/angular-page-content5.component';
import { TabMenuModule, DropdownModule, CalendarModule } from 'primeng/primeng';
import { DataInput1Component } from './angular-page-content5/data-input1/data-input1.component';
import { DataInput2Component } from './angular-page-content5/data-input2/data-input2.component';
import { DataInput3Component } from './angular-page-content5/data-input3/data-input3.component';
import { DataMainInputComponent } from './angular-page-content5/data-main-input/data-main-input.component';
import { AngularPageContent6Component } from './angular-page-content6/angular-page-content6.component';
import { MainFormComponent } from './angular-page-content6/components/main-form/main-form.component';
import { SubForm1Component } from './angular-page-content6/components/sub-form1/sub-form1.component';
import { SubForm2Component } from './angular-page-content6/components/sub-form2/sub-form2.component';
import { SubForm3Component } from './angular-page-content6/components/sub-form3/sub-form3.component';
import { AngularPageContent7Component } from './angular-page-content7/angular-page-content7.component';
import { AngularPageContent0Component } from './angular-page-content0/angular-page-content0.component';
import { DisplayFormStateComponent } from './angular-page-content1/display-form-state/display-form-state.component';
import { FirstCapitalCharCustomValidator } from './angular-page-content1/first-capital-char-custom.validator';
import { AngularPageContent1rComponent } from './angular-page-content1r/angular-page-content1r.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    SharedModule,
    AngularPageRoutingModule,
    PageHeaderModule,
    TabMenuModule,
    DropdownModule,
    CalendarModule
  ],
  declarations: [ AngularPageTitleComponent,
                  AngularPageContent0Component,
                  AngularPageContent1Component,
                  AngularPageContent2Component,
                  AngularPageContent3Component,
                  AngularPageContent4Component,
                  AngularPageContent5Component,
                  AngularPageContent6Component,
                  AngularPageContent7Component,
                  DataInput1Component,
                  DataInput2Component,
                  DataInput3Component,
                  DataMainInputComponent,
                  MainFormComponent,
                  SubForm1Component,
                  SubForm2Component,
                  SubForm3Component,
                  AngularPageContent7Component,
                  AngularPageContent0Component,
                  DisplayFormStateComponent,
                  FirstCapitalCharCustomValidator,
                  AngularPageContent1rComponent
                ],
  exports: [ AngularPageTitleComponent,
             AngularPageContent0Component,
             AngularPageContent1Component,
             AngularPageContent2Component,
             AngularPageContent3Component,
             AngularPageContent4Component,
             AngularPageContent5Component,
             AngularPageContent6Component,
             AngularPageContent7Component,
             DisplayFormStateComponent
            ]
})
export class AngularPageModule { }
