import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AndroidPageContent1Component } from './android-page-content1.component';

describe('AndroidPageContent1Component', () => {
  let component: AndroidPageContent1Component;
  let fixture: ComponentFixture<AndroidPageContent1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
