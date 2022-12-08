import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediatorPatternComponent } from './mediator-pattern.component';

describe('MediatorPatternComponent', () => {
  let component: MediatorPatternComponent;
  let fixture: ComponentFixture<MediatorPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediatorPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediatorPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
