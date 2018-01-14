import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutPageTitleComponent } from './layout-page-title.component';

describe('LayoutPageTitleComponent', () => {
  let component: LayoutPageTitleComponent;
  let fixture: ComponentFixture<LayoutPageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
