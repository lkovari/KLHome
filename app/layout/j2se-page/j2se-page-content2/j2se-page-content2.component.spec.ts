import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { J2sePageContent2Component } from './j2se-page-content2.component';

describe('J2sePageContent2Component', () => {
  let component: J2sePageContent2Component;
  let fixture: ComponentFixture<J2sePageContent2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ J2sePageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(J2sePageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
