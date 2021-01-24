import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { J2sePageTitleComponent } from './j2se-page-title.component';

describe('J2sePageTitleComponent', () => {
  let component: J2sePageTitleComponent;
  let fixture: ComponentFixture<J2sePageTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ J2sePageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(J2sePageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
