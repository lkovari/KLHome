import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidPageContent3Component } from './android-page-content3.component';

describe('AndroidPageContent3Component', () => {
  let component: AndroidPageContent3Component;
  let fixture: ComponentFixture<AndroidPageContent3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageContent3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageContent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
