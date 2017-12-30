import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidPageContent2Component } from './android-page-content2.component';

describe('AndroidPageContent2Component', () => {
  let component: AndroidPageContent2Component;
  let fixture: ComponentFixture<AndroidPageContent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
