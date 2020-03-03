import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/course-list/course.service';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-course-information',
  templateUrl: './course-information.component.html',
  styleUrls: ['./course-information.component.css']
})

export class CourseInformationComponent implements OnInit {
  course: Course;

  constructor(
    private route: ActivatedRoute,
    public courseService: CourseService,
    public authService: AuthService){ }

  ngOnInit() {
    this.route.params.pipe(map(params => params['courseid'])).subscribe(courseid => {
      this.course = this.courseService.getCourse(courseid);
    });
  }

  rate(x: number){
    this.courseService.rateCourse(this.course.courseid, x);
  }

}
