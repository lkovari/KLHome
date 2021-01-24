import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AndroidPageTitleComponent } from './android-page-title.component';

describe('AndroidPageTitleComponent', () => {
  let component: AndroidPageTitleComponent;
  let fixture: ComponentFixture<AndroidPageTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AndroidPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AndroidPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
