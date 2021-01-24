import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent4Component } from './angular-page-content4.component';

describe('AngularPageContent4Component', () => {
  let component: AngularPageContent4Component;
  let fixture: ComponentFixture<AngularPageContent4Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
