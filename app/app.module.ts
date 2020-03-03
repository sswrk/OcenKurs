import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseComponent } from './course-list/course/course.component';
import { CourseInformationComponent } from './course-list/course-information/course-information/course-information.component';
import { FilterPipe } from './filters/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCourseComponent } from './course-edition/add-course/add-course.component';
import { FilterByEctsPipe } from './filters/filter-by-ects.pipe';
import { FilterBySemesterPipe } from './filters/filter-by-semester.pipe';
import { FilterByGradePipe } from './filters/filter-by-grade.pipe';
import { EditCourseItemComponent } from './course-edition/edit-course/edit-course-item/edit-course-item.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CourseListAdminComponent } from './course-list-admin/course-list-admin.component';
import { CourseAdminComponent } from './course-list-admin/course-admin/course-admin.component';
import { CourseInformationAdminComponent } from './course-list-admin/course-information-admin/course-information-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CourseListComponent,
    CourseComponent,
    CourseInformationComponent,
    FilterPipe,
    AddCourseComponent,
    FilterByEctsPipe,
    FilterBySemesterPipe,
    FilterByGradePipe,
    EditCourseItemComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CourseListAdminComponent,
    CourseAdminComponent,
    CourseInformationAdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
