import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DataInput3Component } from './data-input3.component';

describe('DataInput3Component', () => {
  let component: DataInput3Component;
  let fixture: ComponentFixture<DataInput3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInput3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInput3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
