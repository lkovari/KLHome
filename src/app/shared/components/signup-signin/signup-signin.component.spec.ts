import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupSigninComponent } from './signup-signin.component';

describe('SignupSigninComponent', () => {
  let component: SignupSigninComponent;
  let fixture: ComponentFixture<SignupSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
