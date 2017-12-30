import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelphiPageContent4Component } from './delphi-page-content4.component';

describe('DelphiPageContent4Component', () => {
  let component: DelphiPageContent4Component;
  let fixture: ComponentFixture<DelphiPageContent4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelphiPageContent4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelphiPageContent4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
