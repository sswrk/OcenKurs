import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseInformationComponent } from './course-list/course-information/course-information/course-information.component';
import { AddCourseComponent } from './course-edition/add-course/add-course.component';
import { EditCourseItemComponent } from './course-edition/edit-course/edit-course-item/edit-course-item.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './auth/dashboard/dashboard.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { CourseListAdminComponent } from './course-list-admin/course-list-admin.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    pathMatch: 'full',
    component: CourseListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coursesadmin',
    pathMatch: 'full',
    component: CourseListAdminComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'courses/:courseid',
    component: CourseInformationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'addCourse',
    component: AddCourseComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'editCourse/:courseid',
    component: EditCourseItemComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
