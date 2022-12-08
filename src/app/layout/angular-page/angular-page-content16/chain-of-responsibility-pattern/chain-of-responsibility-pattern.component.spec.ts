import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChainOfResponsibilityPatternComponent } from './chain-of-responsibility-pattern.component';

describe('ChainOfResponsibilityPatternComponent', () => {
  let component: ChainOfResponsibilityPatternComponent;
  let fixture: ComponentFixture<ChainOfResponsibilityPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChainOfResponsibilityPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChainOfResponsibilityPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
