import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DelphiPageContent3Component } from './delphi-page-content3.component';

describe('DelphiPageContent3Component', () => {
  let component: DelphiPageContent3Component;
  let fixture: ComponentFixture<DelphiPageContent3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelphiPageContent3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelphiPageContent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
