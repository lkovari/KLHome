import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { J2sePageContent1Component } from './j2se-page-content1.component';

describe('J2sePageContent1Component', () => {
  let component: J2sePageContent1Component;
  let fixture: ComponentFixture<J2sePageContent1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ J2sePageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(J2sePageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
