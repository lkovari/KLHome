import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { J2eePageContent1Component } from './j2ee-page-content1.component';

describe('J2eePageContent1Component', () => {
  let component: J2eePageContent1Component;
  let fixture: ComponentFixture<J2eePageContent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ J2eePageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(J2eePageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
