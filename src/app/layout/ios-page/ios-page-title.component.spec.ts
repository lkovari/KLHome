import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IosPageTitleComponent } from './ios-page-title.component';

describe('IosPageTitleComponent', () => {
  let component: IosPageTitleComponent;
  let fixture: ComponentFixture<IosPageTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IosPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IosPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
