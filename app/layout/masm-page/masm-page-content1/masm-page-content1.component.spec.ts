import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasmPageContent1Component } from './masm-page-content1.component';

describe('MasmPageContent1Component', () => {
  let component: MasmPageContent1Component;
  let fixture: ComponentFixture<MasmPageContent1Component>;

  beforeEach(async(() => {
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
