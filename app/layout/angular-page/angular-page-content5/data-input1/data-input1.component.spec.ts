import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInput1Component } from './data-input1.component';

describe('DataInput1Component', () => {
  let component: DataInput1Component;
  let fixture: ComponentFixture<DataInput1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInput1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInput1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
