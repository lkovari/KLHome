import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdapterPatternComponent } from './adapter-pattern.component';

describe('AdapterPatternComponent', () => {
  let component: AdapterPatternComponent;
  let fixture: ComponentFixture<AdapterPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdapterPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdapterPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
