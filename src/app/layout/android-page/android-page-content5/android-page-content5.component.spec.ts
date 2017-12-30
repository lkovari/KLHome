import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AndroidPageContent5Component } from './android-page-content5.component';

describe('AndroidPageContent5Component', () => {
  let component: AndroidPageContent5Component;
  let fixture: ComponentFixture<AndroidPageContent5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageContent5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageContent5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
