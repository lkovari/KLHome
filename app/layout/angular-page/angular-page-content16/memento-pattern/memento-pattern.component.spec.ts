import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MementoPatternComponent } from './memento-pattern.component';

describe('MementoPatternComponent', () => {
  let component: MementoPatternComponent;
  let fixture: ComponentFixture<MementoPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MementoPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MementoPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
