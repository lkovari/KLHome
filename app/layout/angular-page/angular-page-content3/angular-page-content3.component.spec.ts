import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent3Component } from './angular-page-content3.component';

describe('AngularPageContent3Component', () => {
  let component: AngularPageContent3Component;
  let fixture: ComponentFixture<AngularPageContent3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
