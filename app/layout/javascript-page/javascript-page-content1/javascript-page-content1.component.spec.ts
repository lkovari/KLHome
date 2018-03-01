import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptPageContent1Component } from './javascript-page-content1.component';

describe('JavascriptPageContent1Component', () => {
  let component: JavascriptPageContent1Component;
  let fixture: ComponentFixture<JavascriptPageContent1Component>;

  beforeEach(async(() => {
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
