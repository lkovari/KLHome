import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DelphiPageTitleComponent } from './delphi-page-title.component';
import { DelphiPageContent1Component } from './delphi-page-content1/delphi-page-content1.component';
import { DelphiPageContent2Component } from './delphi-page-content2/delphi-page-content2.component';
import { DelphiPageContent3Component } from './delphi-page-content3/delphi-page-content3.component';
import { DelphiPageContent4Component } from './delphi-page-content4/delphi-page-content4.component';
import { DelphiPageRoutingModule } from './delphi-page-routing.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
    SharedModule,
    DelphiPageRoutingModule
  ],
  declarations: [DelphiPageTitleComponent, DelphiPageContent1Component, DelphiPageContent2Component,
                DelphiPageContent3Component, DelphiPageContent4Component],
  exports: [DelphiPageTitleComponent, DelphiPageContent1Component, DelphiPageContent2Component,
                DelphiPageContent3Component, DelphiPageContent4Component]
})
export class DelphiPageModule { }
