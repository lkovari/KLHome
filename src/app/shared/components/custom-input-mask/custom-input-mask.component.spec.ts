import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputMaskComponent } from './custom-input-mask.component';

describe('CustomInputMaskComponent', () => {
  let component: CustomInputMaskComponent;
  let fixture: ComponentFixture<CustomInputMaskComponent>;

  beforeEach(async(() => {
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
