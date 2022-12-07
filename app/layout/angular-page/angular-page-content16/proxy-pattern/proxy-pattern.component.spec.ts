import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyPatternComponent } from './proxy-pattern.component';

describe('ProxyPatternComponent', () => {
  let component: ProxyPatternComponent;
  let fixture: ComponentFixture<ProxyPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProxyPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
