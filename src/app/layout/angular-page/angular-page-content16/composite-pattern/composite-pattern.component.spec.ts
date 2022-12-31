import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompositePatternComponent } from './composite-pattern.component';

describe('CompositePatternComponent', () => {
  let component: CompositePatternComponent;
  let fixture: ComponentFixture<CompositePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompositePatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompositePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
