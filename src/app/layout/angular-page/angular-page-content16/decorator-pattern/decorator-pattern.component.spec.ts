import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoratorPatternComponent } from './decorator-pattern.component';

describe('DecoratorPatternComponent', () => {
  let component: DecoratorPatternComponent;
  let fixture: ComponentFixture<DecoratorPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecoratorPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DecoratorPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
