import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageTitleComponent } from './angular-page-title.component';

describe('AngularPageTitleComponent', () => {
  let component: AngularPageTitleComponent;
  let fixture: ComponentFixture<AngularPageTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
