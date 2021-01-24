import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { J2eePageContent2Component } from './j2ee-page-content2.component';

describe('J2eePageContent2Component', () => {
  let component: J2eePageContent2Component;
  let fixture: ComponentFixture<J2eePageContent2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ J2eePageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(J2eePageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
