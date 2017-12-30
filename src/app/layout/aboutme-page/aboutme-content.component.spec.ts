import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutmeContentComponent } from './aboutme-content.component';

describe('AboutmeContentComponent', () => {
  let component: AboutmeContentComponent;
  let fixture: ComponentFixture<AboutmeContentComponent>;

  beforeEach(async(() => {
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
