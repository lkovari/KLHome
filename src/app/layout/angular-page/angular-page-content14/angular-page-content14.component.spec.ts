import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent14Component } from './angular-page-content14.component';

describe('AngularPageContent14Component', () => {
  let component: AngularPageContent14Component;
  let fixture: ComponentFixture<AngularPageContent14Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPageContent14Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent14Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
