import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMainInputComponent } from './data-main-input.component';

describe('DataMainInputComponent', () => {
  let component: DataMainInputComponent;
  let fixture: ComponentFixture<DataMainInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataMainInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMainInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
