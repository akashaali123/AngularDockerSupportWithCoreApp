import { DatatableResultsComponent } from './../Modules/test/components/datatable-results/datatable-results.component';
import { DatatableQuestionsComponent } from './../Modules/questions/datatable-questions/datatable-questions.component';
import { DatatableCategoryComponent } from './../Modules/category/components/datatable-category/datatable-category.component';
import { ViewQuestionComponent } from './../Modules/test/components/view-question/view-question.component';
import { ViewTestComponent } from './../Modules/test/components/view-test/view-test.component';
import { ThankyouPageComponent } from './../Modules/test/components/thankyou-page/thankyou-page.component';
import { VerifierGuard } from './../Guards/verifier.guard';
import { ContributorGuard } from './../Guards/contributor.guard';
import { ResetPasswordComponent } from './../Modules/registration/component/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './../Modules/registration/component/forgot-password/forgot-password.component';
import { ListTestComponent } from './../Modules/test/components/list-test/list-test.component';
import { CreateUserComponent } from './../Modules/user/components/create-user/create-user.component';
import { TestScreenComponent } from './../Modules/test/components/test-screen/test-screen.component';
import { StartTestComponent } from './../Modules/test/components/start-test/start-test.component';
import { ListQuestionsComponent } from './../Modules/questions/list-questions/list-questions.component';
import { CreateQuestionsComponent } from './../Modules/questions/create-questions/create-questions.component';
import { EditQuestionsComponent } from './../Modules/questions/edit-questions/edit-questions.component';
import { ListExperienceComponent } from './../Modules/experience-level/components/list-experience/list-experience.component';
import { CreateExperienceComponent } from './../Modules/experience-level/components/create-experience/create-experience.component';
import { EditExperienceComponent } from './../Modules/experience-level/components/edit-experience/edit-experience.component';
import { EditCandidateComponent } from './../Modules/candidate/components/edit-candidate/edit-candidate.component';
import { ListCandidateComponent } from './../Modules/candidate/components/list-candidate/list-candidate.component';
import { CreateCandidateComponent } from './../Modules/candidate/components/create-candidate/create-candidate.component';
import { DashboardAnalyticsComponent } from './../Modules/admin/component/dashboard-analytics/dashboard-analytics.component';
import { AdminBodyComponent } from './../Modules/admin/component/admin-body/admin-body.component';
import { Routes } from '@angular/router';

/** Guards */
import { AdminGuard } from './../Guards/Admin.guard';
import { AuthGuard } from './../Guards/auth.guard';
import { LoggedInGuard } from './../Guards/LoggedIn.guard';

/** Components */
import { PageNotFoundComponent } from './../Modules/page-not-found/component/page-not-found.component';
import { LoginComponent } from '../Modules/registration/component/login/login.component';
import { EditCategoryComponent } from '../Modules/category/components/edit-category/edit-category.component';
import { CreateCategoryComponent } from '../Modules/category/components/create-category/create-category.component';
import { ListCategoryComponent } from '../Modules/category/components/list-category/list-category.component';
import { CreateTestComponent } from '../Modules/test/components/create-test/create-test.component';
import { ListUserComponent } from '../Modules/user/components/list-user/list-user.component';
import { EditUserComponent } from '../Modules/user/components/edit-user/edit-user.component';

// Using ForRoot
const HomeModuleRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
];

// Using ForRoot
const RegistrationModuleRoutes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path : 'login',
    component : LoginComponent,
    canActivate : [LoggedInGuard]
  },
  {
    path : 'forgotpassword',
    component : ForgotPasswordComponent,
  },
  {
    path : 'resetpassword',
    component : ResetPasswordComponent,
  }
];

// Using ForRoot
const AdminModuleRoutes: Routes = [
  {
    path : 'admin',
    component : DashboardAnalyticsComponent,
    canActivate : [AdminGuard]
  }
];

// Using ForRoot
const UserModuleRoutes: Routes = [
  {
    path : 'admin/createuser',
    component : CreateUserComponent,
    canActivate : [AdminGuard]
  },
  {
      path : 'admin/userlist',
      component : ListUserComponent,
      canActivate : [AdminGuard]
  },
  {
    path : 'admin/userlist/edit/:id',
    component : EditUserComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/listresults',
    component : DatatableResultsComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/viewresults/:id',
    component : ViewTestComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/viewquestions/:id',
    component : ViewQuestionComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'verifier',
    component : DatatableResultsComponent,
    canActivate : [VerifierGuard]
  },
  {
    path : 'verifier/viewresults/:id',
    component : ViewTestComponent,
    canActivate : [VerifierGuard]
  },
  {
    path : 'verifier/viewquestions/:id',
    component : ViewQuestionComponent,
    canActivate : [VerifierGuard]
  },

];


// Using ForRoot
const TestModuleRoutes: Routes = [
  {
    path : 'admin/createtest',
    component : StartTestComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'candidate',
    component : CreateTestComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'createtest',
    component : CreateTestComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'test',
    component : TestScreenComponent,
    canActivate : [AuthGuard]
  },
  {
    path : 'thankyou',
    component : ThankyouPageComponent
  },
];


// Using ForRoot
const CategoryModuleRoutes: Routes = [
  {
    path : 'admin/category',
    redirectTo : 'admin/category/list',
    canActivate : [AdminGuard],
    pathMatch: 'full'
  },
  {
    path : 'admin/category/list',
    component : ListCategoryComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/category/create',
    component : CreateCategoryComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/category/edit/:id',
    component : EditCategoryComponent,
    canActivate : [AdminGuard]
  },
];


// Using ForRoot
const CandidateModuleRoutes: Routes = [
  {
    path : 'admin/candidate',
    redirectTo : 'admin/candidate/list',
    canActivate : [AdminGuard],
    pathMatch: 'full'
  },
  {
    path : 'admin/candidate/list',
    component : ListCandidateComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/candidate/create',
    component : CreateCandidateComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/candidate/edit/:id',
    component : EditCandidateComponent,
    canActivate : [AdminGuard]
  },
];

// Using ForRoot
const QuestionsModuleRoutes: Routes = [
  {
    path : 'admin/questions',
    redirectTo : 'admin/questions/list',
    canActivate : [AdminGuard],
    pathMatch: 'full'
  },
  {
    path : 'admin/questions/list',
    component : DatatableQuestionsComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/questions/create',
    component : CreateQuestionsComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/questions/edit/:id',
    component : EditQuestionsComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'contributor',
    redirectTo : 'contributor/list',
    canActivate : [ContributorGuard],
    pathMatch: 'full'
  },
  {
    path : 'contributor/list',
    component : DatatableQuestionsComponent,
    canActivate : [ContributorGuard]
  },
  {
    path : 'contributor/create',
    component : CreateQuestionsComponent,
    canActivate : [ContributorGuard]
  },
  {
    path : 'contributor/edit/:id',
    component : EditQuestionsComponent,
    canActivate : [ContributorGuard]
  },
  // contributor
];


// Using ForRoot
const ExperienceLevelModuleRoutes: Routes = [
  {
    path : 'admin/experiencelevel',
    redirectTo : 'admin/experiencelevel/list',
    canActivate : [AdminGuard],
    pathMatch: 'full'
  },
  {
    path : 'admin/experiencelevel/list',
    component : ListExperienceComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/experiencelevel/create',
    component : CreateExperienceComponent,
    canActivate : [AdminGuard]
  },
  {
    path : 'admin/experiencelevel/edit/:id',
    component : EditExperienceComponent,
    canActivate : [AdminGuard]
  },
];




// Using ForChild
const PagenotFoundModuleRoutes: Routes = [
  {path : '**' , component : PageNotFoundComponent },
];

export {
  RegistrationModuleRoutes,
  HomeModuleRoutes,
  AdminModuleRoutes,
  UserModuleRoutes,
  PagenotFoundModuleRoutes,
  CandidateModuleRoutes,
  CategoryModuleRoutes,
  ExperienceLevelModuleRoutes,
  QuestionsModuleRoutes,
  TestModuleRoutes
};
