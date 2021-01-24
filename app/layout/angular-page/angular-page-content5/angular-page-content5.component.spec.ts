import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent5Component } from './angular-page-content5.component';

describe('AngularPageContent5Component', () => {
  let component: AngularPageContent5Component;
  let fixture: ComponentFixture<AngularPageContent5Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
