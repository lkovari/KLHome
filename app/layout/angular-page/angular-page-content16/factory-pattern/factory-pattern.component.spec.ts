import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryPatternComponent } from './factory-pattern.component';

describe('FactoryPatternComponent', () => {
  let component: FactoryPatternComponent;
  let fixture: ComponentFixture<FactoryPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactoryPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
