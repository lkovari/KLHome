import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingletonPatternComponent } from './singleton-pattern.component';

describe('SingletonPatternComponent', () => {
  let component: SingletonPatternComponent;
  let fixture: ComponentFixture<SingletonPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingletonPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingletonPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
