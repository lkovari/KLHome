import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent10Component } from './angular-page-content10.component';

describe('AngularPageContent10Component', () => {
  let component: AngularPageContent10Component;
  let fixture: ComponentFixture<AngularPageContent10Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent10Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
