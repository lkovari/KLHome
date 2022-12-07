import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgePatternComponent } from './bridge-pattern.component';

describe('BridgePatternComponent', () => {
  let component: BridgePatternComponent;
  let fixture: ComponentFixture<BridgePatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BridgePatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgePatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
