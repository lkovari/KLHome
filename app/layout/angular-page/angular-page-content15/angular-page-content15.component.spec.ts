import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent15Component } from './angular-page-content15.component';

describe('AngularPageContent15Component', () => {
  let component: AngularPageContent15Component;
  let fixture: ComponentFixture<AngularPageContent15Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPageContent15Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent15Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
