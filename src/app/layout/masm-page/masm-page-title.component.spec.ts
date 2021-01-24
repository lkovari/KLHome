import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MasmPageTitleComponent } from './masm-page-title.component';

describe('MasmPageTitleComponent', () => {
  let component: MasmPageTitleComponent;
  let fixture: ComponentFixture<MasmPageTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MasmPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasmPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
