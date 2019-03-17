import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent7Component } from './angular-page-content7.component';

describe('AngularPageContent7Component', () => {
  let component: AngularPageContent7Component;
  let fixture: ComponentFixture<AngularPageContent7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
