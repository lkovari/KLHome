import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptPageTitleComponent } from './javascript-page-title.component';

describe('JavascriptPageTitleComponent', () => {
  let component: JavascriptPageTitleComponent;
  let fixture: ComponentFixture<JavascriptPageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JavascriptPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavascriptPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
