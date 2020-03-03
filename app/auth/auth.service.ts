import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import {ADMINS} from './admins';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: Observable<firebase.User>;
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(public router: Router, public fireAuth: AngularFireAuth) {
    this.userData = fireAuth.authState;
   }
   getUser(): User | null {
     return this.fireAuth.auth.currentUser;
   }
  isLoggedIn(): boolean {
    return this.getUser() != null;
  }
  isAdmin(): boolean {
    return (ADMINS.includes(this.getUser().email));
    

  }
  SignIn(email, password) {
    return this.fireAuth.auth
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => { this.fireAuth.auth.signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['courses']))
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      }); });
  }
  SignUp(email, password) {
    return this.fireAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => this.router.navigate(['courses']))
    .catch(err => {
      console.log('Something went wrong: ', err.message);
    });
  }
  SignOut() {
    return this.fireAuth.auth
    .signOut()
    .then(() => this.router.navigate(['dashboard']));
  }
}
