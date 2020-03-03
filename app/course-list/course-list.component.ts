import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
  
})
export class CourseListComponent implements OnInit {
  coursesService: CourseService;

  courses: Observable<Course[]>;
  constructor(serv: CourseService) { 
    this.coursesService = serv;
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(): void{
    this.courses = this.coursesService.getObservableOfCourses();
  }
}
