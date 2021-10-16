import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent13Component } from './angular-page-content13.component';

describe('AngularPageContent13Component', () => {
  let component: AngularPageContent13Component;
  let fixture: ComponentFixture<AngularPageContent13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPageContent13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
