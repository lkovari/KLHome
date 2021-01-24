import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasmPageContent1Component } from './masm-page-content1.component';

describe('MasmPageContent1Component', () => {
  let component: MasmPageContent1Component;
  let fixture: ComponentFixture<MasmPageContent1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasmPageContent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasmPageContent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
