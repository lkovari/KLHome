import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DelphiPageContent1Component } from './delphi-page-content1.component';

describe('DelphiPageContent1Component', () => {
  let component: DelphiPageContent1Component;
  let fixture: ComponentFixture<DelphiPageContent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DelphiPageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelphiPageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
