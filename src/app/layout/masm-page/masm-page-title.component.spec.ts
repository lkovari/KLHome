import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasmPageTitleComponent } from './masm-page-title.component';

describe('MasmPageTitleComponent', () => {
  let component: MasmPageTitleComponent;
  let fixture: ComponentFixture<MasmPageTitleComponent>;

  beforeEach(async(() => {
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
