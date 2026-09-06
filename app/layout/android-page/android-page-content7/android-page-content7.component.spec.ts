import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AndroidPageContent7Component } from './android-page-content7.component';

describe('AndroidPageContent7Component', () => {
  let component: AndroidPageContent7Component;
  let fixture: ComponentFixture<AndroidPageContent7Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageContent7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageContent7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
