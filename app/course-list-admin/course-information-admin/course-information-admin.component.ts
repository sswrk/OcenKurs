import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course-list/course.service';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-information-admin',
  templateUrl: './course-information-admin.component.html',
  styleUrls: ['./course-information-admin.component.css']
})

export class CourseInformationAdminComponent implements OnInit {
  course: Course;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService) { }

  ngOnInit() {
    this.route.params.pipe(map(params => params['courseid'])).subscribe(courseid => {
      this.course = this.courseService.getCourse(courseid);
    });
  }

  remove(courseid) {
    this.courseService.deleteCourse(courseid);
    
  }

}
