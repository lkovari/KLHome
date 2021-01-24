import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IosPageContent2Component } from './ios-page-content2.component';

describe('IosPageContent2Component', () => {
  let component: IosPageContent2Component;
  let fixture: ComponentFixture<IosPageContent2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IosPageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IosPageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
