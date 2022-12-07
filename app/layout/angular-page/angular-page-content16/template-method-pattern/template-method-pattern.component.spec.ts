import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMethodPatternComponent } from './template-method-pattern.component';

describe('TemplateMethodPatternComponent', () => {
  let component: TemplateMethodPatternComponent;
  let fixture: ComponentFixture<TemplateMethodPatternComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateMethodPatternComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateMethodPatternComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
