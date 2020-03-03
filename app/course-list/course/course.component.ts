import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CourseService } from 'src/app/course-list/course.service';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
  
})
export class CourseComponent implements OnInit {
  
  course: Course;

  @Input() courseid: string;
  @Input() image: string;
  @Input() name: string;
  @Input() grade: number;
  @Input() votes: number;

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public courseService: CourseService
  ) { }

  ngOnInit() {
    this.route.params.pipe(map(params => params['courseid'])).subscribe(courseid => {
      this.course = this.courseService.getCourse(courseid);
    });
  }

  rate(x: number){
    this.courseService.rateCourse(this.courseid, x);
  }

}
