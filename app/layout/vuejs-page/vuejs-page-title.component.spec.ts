import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VuejsPageTitleComponent } from './vuejs-page-title.component';

describe('VuejsPageTitleComponent', () => {
  let component: VuejsPageTitleComponent;
  let fixture: ComponentFixture<VuejsPageTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VuejsPageTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VuejsPageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
