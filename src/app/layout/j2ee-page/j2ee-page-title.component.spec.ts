import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { J2eePageTitleComponent } from './j2ee-page-title.component';

describe('J2eePageTitleComponent', () => {
  let component: J2eePageTitleComponent;
  let fixture: ComponentFixture<J2eePageTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ J2eePageTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(J2eePageTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
