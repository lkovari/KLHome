import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePatternComponent } from './state-pattern.component';

describe('StatePatternComponent', () => {
  let component: StatePatternComponent;
  let fixture: ComponentFixture<StatePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatePatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
