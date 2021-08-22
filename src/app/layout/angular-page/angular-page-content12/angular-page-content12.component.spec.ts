import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent12Component } from './angular-page-content12.component';

describe('AngularPageContent12Component', () => {
  let component: AngularPageContent12Component;
  let fixture: ComponentFixture<AngularPageContent12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularPageContent12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
