import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent6Component } from './angular-page-content6.component';

describe('AngularPageContent6Component', () => {
  let component: AngularPageContent6Component;
  let fixture: ComponentFixture<AngularPageContent6Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
