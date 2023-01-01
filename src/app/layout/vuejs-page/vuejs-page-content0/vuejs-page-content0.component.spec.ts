import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuejsPageContent0Component } from './vuejs-page-content0.component';

describe('VuejsPageContent0Component', () => {
  let component: VuejsPageContent0Component;
  let fixture: ComponentFixture<VuejsPageContent0Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuejsPageContent0Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuejsPageContent0Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
