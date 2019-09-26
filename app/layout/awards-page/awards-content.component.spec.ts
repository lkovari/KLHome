import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwardsContentComponent } from './awards-content.component';

describe('AwardsContentComponent', () => {
  let component: AwardsContentComponent;
  let fixture: ComponentFixture<AwardsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwardsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwardsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
