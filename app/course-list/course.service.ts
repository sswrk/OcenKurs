import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';
import { map } from 'rxjs/operators';
import{ COURSES } from './mock';
import { FirestoreServiceService } from '../firestore-service.service';
import { AuthService} from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Course[];
  currentid: number;

  constructor(private firestore: FirestoreServiceService, public fireAuth: AuthService) {
      //this.courses=[];
      this.getArrayOfCourses();
     this.currentid = 0;
      //this.courses=COURSES;
      /*if(this.courses.length==0){
        for(let c of COURSES){
          this.currentid=this.currentid+1;
          this.courses.push(c);
          this.firestore.createData(c);
        }
      }*/
      
  }

  getArrayOfCourses() {
    this.firestore.getCourses().subscribe(data => {
      this.courses = data.map(e => {
        const data = e.payload.doc.data() as Course;
        const id = e.payload.doc.id;
        return { id, ...data } as Course;
      });
    });
  }

  getObservableOfCourses() {
    return this.firestore.getCourses().pipe(map( changes => {
      return changes.map(a => {
          const data = a.payload.doc.data() as Course;
          const id = a.payload.doc.id;
          return { id, ...data } as Course;
      });
  }));
}

  getCourse(courseid: string) {
    this.getArrayOfCourses();
    return this.courses.filter(c => c.courseid === courseid)[0];
  }
  getCourses() {
    return this.courses;
  }
  rateCourse(courseid: string, rating: number){
    const courseToRate = this.getCourse(courseid);
    if(!this.hasRated(this.getCourse(courseid), this.fireAuth.getUser().email) || this.fireAuth.isAdmin()){
      courseToRate.votes++;
      courseToRate.grade=(rating+courseToRate.grade*(courseToRate.votes-1))/courseToRate.votes;
      courseToRate.ratings.push({email: this.fireAuth.getUser().email, rating: rating})
      this.firestore.updateData(this.getCourse(courseid));
      this.getObservableOfCourses();
    }
    else{
      window.alert("Ten kurs został już przez ciebie oceniony!");
    }
    
  }
  deleteCourse(courseid: string) {
    
    const courseToDelete = this.getCourse(courseid);
    this.firestore.deleteData(courseToDelete);
    
  }
  hasRated(course: Course, email: string) {
    for(let r of course.ratings){
      if(r.email==email) return true;
    }
    return false;
  }
  addCourse(name: string, ects: number, image: string, description: string, semester: number, formOfCourse: string, maxStudents: number) {
    if(this.currentid==0) this.currentid=this.courses.length;
    while(this.getCourse(this.currentid.toString())!=null){
      this.currentid++;
    }
    const course: Course = {
      courseid: this.currentid.toString(),
      name,
      ects,
      image,
      description,
      semester,
      formOfCourse,
      maxStudents,
      grade: 0,
      votes: 0,
      ratings: []
    };
    this.currentid=this.currentid+1;
    this.courses.push(course);
    this.firestore.createData(course);
  }
  editCourse(courseid: string, name: string, ects: number, image: string, description: string, semester: number, formOfCourse: string, maxStudents: number) {
    this.courses.map(course => {
      if (course.courseid === courseid) {
        course.name = name;
        course.ects = ects;
        course.image = image;
        course.description = description;
        course.semester = semester;
        course.formOfCourse = formOfCourse;
        course.maxStudents = maxStudents;
      }
    });
    this.firestore.updateData(this.getCourse(courseid));
  }
}

