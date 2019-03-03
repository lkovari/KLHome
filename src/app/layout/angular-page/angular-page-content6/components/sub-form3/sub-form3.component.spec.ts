import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubForm3Component } from './sub-form3.component';

describe('SubForm3Component', () => {
  let component: SubForm3Component;
  let fixture: ComponentFixture<SubForm3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubForm3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubForm3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
