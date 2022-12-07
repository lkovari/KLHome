import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorPatternComponent } from './visitor-pattern.component';

describe('VisitorPatternComponent', () => {
  let component: VisitorPatternComponent;
  let fixture: ComponentFixture<VisitorPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitorPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
