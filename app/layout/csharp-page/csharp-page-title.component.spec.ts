import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CsharpPageTitleComponent } from './csharp-page-title.component';

describe('CsharpPageTitleComponent', () => {
  let component: CsharpPageTitleComponent;
  let fixture: ComponentFixture<CsharpPageTitleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CsharpPageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsharpPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
