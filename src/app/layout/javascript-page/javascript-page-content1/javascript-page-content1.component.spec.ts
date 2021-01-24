import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { JavascriptPageContent1Component } from './javascript-page-content1.component';

describe('JavascriptPageContent1Component', () => {
  let component: JavascriptPageContent1Component;
  let fixture: ComponentFixture<JavascriptPageContent1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ JavascriptPageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavascriptPageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
