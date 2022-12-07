import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyPatternComponent } from './strategy-pattern.component';

describe('StrategyPatternComponent', () => {
  let component: StrategyPatternComponent;
  let fixture: ComponentFixture<StrategyPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategyPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
