import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpPageContent1Component } from './csharp-page-content1.component';

describe('CsharpPageContent1Component', () => {
  let component: CsharpPageContent1Component;
  let fixture: ComponentFixture<CsharpPageContent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsharpPageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpPageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
