import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IosPageContent1Component } from './ios-page-content1.component';

describe('IosPageContent1Component', () => {
  let component: IosPageContent1Component;
  let fixture: ComponentFixture<IosPageContent1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IosPageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IosPageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
