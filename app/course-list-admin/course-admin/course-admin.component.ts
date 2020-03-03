import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { CourseService } from 'src/app/course-list/course.service';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.css']
  
})
export class CourseAdminComponent implements OnInit {
  
  course: Course;

  @Input() courseid: string;
  @Input() image: string;
  @Input() name: string;
  @Output() signaledDeleted = new EventEmitter<string>();

  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService
  ) { }

  ngOnInit() {
    this.route.params.pipe(map(params => params['courseid'])).subscribe(courseid => {
      this.course = this.courseService.getCourse(courseid);
    });
  }

  remove(courseidd) {
    this.signaledDeleted.emit(this.courseid);
  }


}
