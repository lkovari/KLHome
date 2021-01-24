import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AboutmeContentComponent } from './aboutme-content.component';

describe('AboutmeContentComponent', () => {
  let component: AboutmeContentComponent;
  let fixture: ComponentFixture<AboutmeContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutmeContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutmeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
