import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { PageHeaderModule } from '../../shared/modules/page-header/page-header.module';
import { AngularPageTitleComponent } from './angular-page-title.component';
import { AngularPageContent1Component } from './angular-page-content1/angular-page-content1.component';
import { AngularPageRoutingModule } from './angular-page-routing.module';
import { AngularPageContent2Component } from './angular-page-content2/angular-page-content2.component';
import { AngularPageContent3Component } from './angular-page-content3/angular-page-content3.component';
import { AngularPageContent4Component } from './angular-page-content4/angular-page-content4.component';
import { AngularPageContent5Component } from './angular-page-content5/angular-page-content5.component';
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
import { FirstCapitalCharCustomValidator } from './angular-page-content1/first-capital-char-custom.validator';
import { AngularPageContent1rComponent } from './angular-page-content1r/angular-page-content1r.component';
import { AngularPageContent8Component } from './angular-page-content8/angular-page-content8.component';
import { AngularPageContent9Component } from './angular-page-content9/angular-page-content9.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DropdownModule } from 'primeng/dropdown';
import { TabMenuModule } from 'primeng/tabmenu';
import { CalendarModule } from 'primeng/calendar';
import { AngularPageContent10Component } from './angular-page-content10/angular-page-content10.component';
import { AngularPageContent11Component } from './angular-page-content11/angular-page-content11.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SpinnerModule } from 'primeng/spinner';
import { FormValidationMonitorV4Module } from '@lkovari/form-validation-monitor-v4';
import { AngularPageContent12Component } from './angular-page-content12/angular-page-content12.component';
import { ExtractFormControlsPipe } from './angular-page-content12/pipes/extract-form-controls.pipe';
import { ToastModule } from 'primeng/toast';
import { AngularPageContent13Component } from './angular-page-content13/angular-page-content13.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { AngularPageContent14Component } from './angular-page-content14/angular-page-content14.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    AngularPageRoutingModule,
    PageHeaderModule,
    TabMenuModule,
    DropdownModule,
    CalendarModule,
    ScrollingModule,
    SelectButtonModule,
    SpinnerModule,
    FormValidationMonitorV4Module,
    ToastModule,
    HttpClientModule,
    DialogModule
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
                  AngularPageContent1rComponent,
                  AngularPageContent8Component,
                  DataInput1Component,
                  DataInput2Component,
                  DataInput3Component,
                  DataMainInputComponent,
                  MainFormComponent,
                  SubForm1Component,
                  SubForm2Component,
                  SubForm3Component,
                  AngularPageContent0Component,
                  FirstCapitalCharCustomValidator,
                  AngularPageContent9Component,
                  AngularPageContent10Component,
                  AngularPageContent11Component,
                  AngularPageContent12Component,
                  ExtractFormControlsPipe,
                  AngularPageContent13Component,
                  AngularPageContent14Component
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
             AngularPageContent8Component,
             AngularPageContent9Component,
             AngularPageContent10Component,
             AngularPageContent11Component,
             AngularPageContent12Component,
             AngularPageContent13Component,
             AngularPageContent14Component
            ]
})
export class AngularPageModule { }
