import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlyweightPatternComponent } from './flyweight-pattern.component';

describe('FlyweightPatternComponent', () => {
  let component: FlyweightPatternComponent;
  let fixture: ComponentFixture<FlyweightPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlyweightPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlyweightPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
