import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubForm2Component } from './sub-form2.component';

describe('SubForm2Component', () => {
  let component: SubForm2Component;
  let fixture: ComponentFixture<SubForm2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubForm2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubForm2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
