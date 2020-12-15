import { UserModule } from './Modules/user/user.module';
import { TestModule } from './Modules/test/test.module';
import { QuestionsModule } from './Modules/questions/questions.module';
import { ExperienceLevelModule } from './Modules/experience-level/experience-level.module';
import { CandidateModule } from './Modules/candidate/candidate.module';
import { AdminModule } from './Modules/admin/admin.module';
import { PageNotFoundModule } from './Modules/page-not-found/page-not-found.module';
import { AdminGuard } from './Guards/Admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

/** Routes */
import { RegistrationModule } from './Modules/registration/registration.module';
import { CategoryModule } from './Modules/category/category.module';
import { HomeModuleRoutes } from './routes/routes';


@NgModule({
  imports: [
    RouterModule.forRoot(HomeModuleRoutes),
    RegistrationModule,
    AdminModule,
    // Include all modules here
    CandidateModule,
    CategoryModule,
    ExperienceLevelModule,
    QuestionsModule,
    TestModule,
    UserModule,
    // PageNotFoundModule Must be place at the end
    PageNotFoundModule
  ],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule { }
