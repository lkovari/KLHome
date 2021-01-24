import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DelphiPageContent2Component } from './delphi-page-content2.component';

describe('DelphiPageContent2Component', () => {
  let component: DelphiPageContent2Component;
  let fixture: ComponentFixture<DelphiPageContent2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelphiPageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelphiPageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
