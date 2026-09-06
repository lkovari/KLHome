import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AndroidPageContent6Component } from './android-page-content6.component';

describe('AndroidPageContent6Component', () => {
  let component: AndroidPageContent6Component;
  let fixture: ComponentFixture<AndroidPageContent6Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageContent6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageContent6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
