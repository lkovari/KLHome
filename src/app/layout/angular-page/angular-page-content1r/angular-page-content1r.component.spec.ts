import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AngularPageContent1rComponent } from './angular-page-content1r.component';

describe('AngularPageContent1rComponent', () => {
  let component: AngularPageContent1rComponent;
  let fixture: ComponentFixture<AngularPageContent1rComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularPageContent1rComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularPageContent1rComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
