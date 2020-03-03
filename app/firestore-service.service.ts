import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import {Course} from './models/course.model'

@Injectable({
  providedIn: 'root'
})
export class FirestoreServiceService {

  dbcourses;
  currentid;

  constructor(private firestore: AngularFirestore) {
    this.dbcourses = firestore.collection('courses');
    this.currentid = firestore.collection('currentid');
   }

   getCourses() {
    return this.firestore.collection('courses').snapshotChanges();
  }

  createData(course: Course) {
    this.firestore.collection("courses").doc(course.courseid).set(course);
  }

  updateData(course: Course) {
    return this.firestore.doc('courses/' + course.courseid).update(course);
  }

  deleteData(course: Course) {
    return this.firestore.doc('courses/' + course.courseid).delete();
  }

  exists(id: string) :boolean{
    var docRef = this.firestore.collection("courses").doc(id);

    docRef.get().toPromise().then(function(doc){
      if (doc.exists) {
        return true;
      }
    });
    return false;
  }

}
