import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent11Component } from './angular-page-content11.component';

describe('AngularPageContent11Component', () => {
  let component: AngularPageContent11Component;
  let fixture: ComponentFixture<AngularPageContent11Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
