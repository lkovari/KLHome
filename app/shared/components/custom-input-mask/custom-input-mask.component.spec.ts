import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomInputMaskComponent } from './custom-input-mask.component';

describe('CustomInputMaskComponent', () => {
  let component: CustomInputMaskComponent;
  let fixture: ComponentFixture<CustomInputMaskComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomInputMaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomInputMaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
