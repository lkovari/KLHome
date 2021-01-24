import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { J2sePageContent3Component } from './j2se-page-content3.component';

describe('J2sePageContent3Component', () => {
  let component: J2sePageContent3Component;
  let fixture: ComponentFixture<J2sePageContent3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ J2sePageContent3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(J2sePageContent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
