import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasmPageContent2Component } from './masm-page-content2.component';

describe('MasmPageContent2Component', () => {
  let component: MasmPageContent2Component;
  let fixture: ComponentFixture<MasmPageContent2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasmPageContent2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasmPageContent2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
