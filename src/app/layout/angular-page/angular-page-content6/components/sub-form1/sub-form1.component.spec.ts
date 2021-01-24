import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SubForm1Component } from './sub-form1.component';

describe('SubForm1Component', () => {
  let component: SubForm1Component;
  let fixture: ComponentFixture<SubForm1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SubForm1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubForm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
