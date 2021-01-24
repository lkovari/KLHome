import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JavascriptPageContent2Component } from './javascript-page-content2.component';

describe('JavascriptPageContent2Component', () => {
  let component: JavascriptPageContent2Component;
  let fixture: ComponentFixture<JavascriptPageContent2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JavascriptPageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavascriptPageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
