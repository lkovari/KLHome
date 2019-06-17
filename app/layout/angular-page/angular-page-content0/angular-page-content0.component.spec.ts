import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent0Component } from './angular-page-content0.component';

describe('AngularPageContent0Component', () => {
  let component: AngularPageContent0Component;
  let fixture: ComponentFixture<AngularPageContent0Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent0Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
