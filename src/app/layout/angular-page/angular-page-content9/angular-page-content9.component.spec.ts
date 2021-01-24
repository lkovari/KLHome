import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent9Component } from './angular-page-content9.component';

describe('AngularPageContent9Component', () => {
  let component: AngularPageContent9Component;
  let fixture: ComponentFixture<AngularPageContent9Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent9Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent9Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
