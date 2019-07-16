import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularPageContent1rComponent } from './angular-page-content1r.component';

describe('AngularPageContent1rComponent', () => {
  let component: AngularPageContent1rComponent;
  let fixture: ComponentFixture<AngularPageContent1rComponent>;

  beforeEach(async(() => {
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
