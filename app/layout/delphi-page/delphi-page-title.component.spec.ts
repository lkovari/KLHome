import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DelphiPageTitleComponent } from './delphi-page-title.component';

describe('DelphiPageTitleComponent', () => {
  let component: DelphiPageTitleComponent;
  let fixture: ComponentFixture<DelphiPageTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DelphiPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DelphiPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
