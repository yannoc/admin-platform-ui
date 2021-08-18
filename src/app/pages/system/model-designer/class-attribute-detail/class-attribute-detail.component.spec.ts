import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttributeDetailComponent } from './class-attribute-detail.component';

describe('ClassAttributeDetailComponent', () => {
  let component: ClassAttributeDetailComponent;
  let fixture: ComponentFixture<ClassAttributeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassAttributeDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAttributeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
