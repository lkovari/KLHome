import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractFactoryPatternComponent } from './abstract-factory-pattern.component';

describe('AbstractFactoryPatternComponent', () => {
  let component: AbstractFactoryPatternComponent;
  let fixture: ComponentFixture<AbstractFactoryPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbstractFactoryPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractFactoryPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
