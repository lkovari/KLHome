import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent1Component } from './angular-page-content1.component';

describe('AngularPageContent1Component', () => {
  let component: AngularPageContent1Component;
  let fixture: ComponentFixture<AngularPageContent1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
