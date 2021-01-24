import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CsharpPageContent2Component } from './csharp-page-content2.component';

describe('CsharpPageContent2Component', () => {
  let component: CsharpPageContent2Component;
  let fixture: ComponentFixture<CsharpPageContent2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CsharpPageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpPageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
