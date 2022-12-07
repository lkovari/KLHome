import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent16Component } from './angular-page-content16.component';

describe('AngularPageContent16Component', () => {
  let component: AngularPageContent16Component;
  let fixture: ComponentFixture<AngularPageContent16Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPageContent16Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent16Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
