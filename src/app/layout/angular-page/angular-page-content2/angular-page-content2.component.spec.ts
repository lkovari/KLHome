import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent2Component } from './angular-page-content2.component';

describe('AngularPageContent2Component', () => {
  let component: AngularPageContent2Component;
  let fixture: ComponentFixture<AngularPageContent2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
