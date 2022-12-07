import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterpreterPatternComponent } from './interpreter-pattern.component';

describe('InterpreterPatternComponent', () => {
  let component: InterpreterPatternComponent;
  let fixture: ComponentFixture<InterpreterPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterpreterPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterpreterPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
