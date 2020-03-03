import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course-list/course.service';
import { Course } from '../models/course.model';

@Component({
  selector: 'app-course-list-admin',
  templateUrl: './course-list-admin.component.html',
  styleUrls: ['./course-list-admin.component.css']
  
})
export class CourseListAdminComponent implements OnInit {
  courses: Course[];
  constructor(private courseService: CourseService) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses(){
    this.courses = this.courseService.getCourses();
  }

  refresh(courseid : string){
    this.courses = this.courses.filter(course => course.courseid != courseid);
    this.courseService.deleteCourse(courseid);
    
  }
}
