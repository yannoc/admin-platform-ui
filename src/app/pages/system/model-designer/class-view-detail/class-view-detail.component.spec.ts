import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassViewDetailComponent } from './class-view-detail.component';

describe('ClassViewDetailComponent', () => {
  let component: ClassViewDetailComponent;
  let fixture: ComponentFixture<ClassViewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassViewDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassViewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
