import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrototypePatternComponent } from './prototype-pattern.component';

describe('PrototypePatternComponent', () => {
  let component: PrototypePatternComponent;
  let fixture: ComponentFixture<PrototypePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrototypePatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrototypePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
