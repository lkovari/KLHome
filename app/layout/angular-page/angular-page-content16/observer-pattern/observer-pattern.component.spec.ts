import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserverPatternComponent } from './observer-pattern.component';

describe('ObserverPatternComponent', () => {
  let component: ObserverPatternComponent;
  let fixture: ComponentFixture<ObserverPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObserverPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserverPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
