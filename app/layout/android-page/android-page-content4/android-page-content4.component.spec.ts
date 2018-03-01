import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidPageContent4Component } from './android-page-content4.component';

describe('AndroidPageContent4Component', () => {
  let component: AndroidPageContent4Component;
  let fixture: ComponentFixture<AndroidPageContent4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageContent4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageContent4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
