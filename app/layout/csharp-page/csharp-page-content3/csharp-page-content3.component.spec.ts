import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsharpPageContent3Component } from './csharp-page-content3.component';

describe('CsharpPageContent3Component', () => {
  let component: CsharpPageContent3Component;
  let fixture: ComponentFixture<CsharpPageContent3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsharpPageContent3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpPageContent3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
