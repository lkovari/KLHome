import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplexNameComponent } from './complex-name.component';

describe('ComplexNameComponent', () => {
  let component: ComplexNameComponent;
  let fixture: ComponentFixture<ComplexNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplexNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplexNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
