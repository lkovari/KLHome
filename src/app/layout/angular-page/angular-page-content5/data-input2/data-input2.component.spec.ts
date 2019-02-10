import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataInput2Component } from './data-input2.component';

describe('DataInput2Component', () => {
  let component: DataInput2Component;
  let fixture: ComponentFixture<DataInput2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataInput2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataInput2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
