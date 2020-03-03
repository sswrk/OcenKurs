import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInformationAdminComponent } from './course-information-admin.component';

describe('CourseInformationAdminComponent', () => {
  let component: CourseInformationAdminComponent;
  let fixture: ComponentFixture<CourseInformationAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseInformationAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseInformationAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
