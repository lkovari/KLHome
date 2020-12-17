import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent11Component } from './angular-page-content11.component';

describe('AngularPageContent11Component', () => {
  let component: AngularPageContent11Component;
  let fixture: ComponentFixture<AngularPageContent11Component>;

  beforeEach(async(() => {
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
