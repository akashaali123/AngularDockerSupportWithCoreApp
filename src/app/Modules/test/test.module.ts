import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DataTablesModule } from 'angular-datatables';
import { UserService } from './../../Services/Users/user.service';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { LoggedInGuard } from 'src/app/Guards/LoggedIn.guard';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminGuard } from 'src/app/Guards/Admin.guard';
import { RegistrationModuleRoutes, TestModuleRoutes } from 'src/app/routes/routes';
import { StartTestComponent } from './components/start-test/start-test.component';
import { TestScreenComponent } from './components/test-screen/test-screen.component';
import { ListTestComponent } from './components/list-test/list-test.component';
import { ThankyouPageComponent } from './components/thankyou-page/thankyou-page.component';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { ViewQuestionComponent } from './components/view-question/view-question.component';
import { DatatableResultsComponent } from './components/datatable-results/datatable-results.component';



@NgModule({
  declarations: [
    CreateTestComponent,
    StartTestComponent,
    TestScreenComponent,
    ListTestComponent,
    ThankyouPageComponent,
    ViewTestComponent,
    ViewQuestionComponent,
    DatatableResultsComponent
  ],
  imports: [
    RouterModule.forRoot(TestModuleRoutes),
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    CommonModule,
    DataTablesModule,
    CKEditorModule,
    TableModule,
    DialogModule,
    MultiSelectModule,
    DropdownModule
  ],
  exports : [
    RouterModule,
  ],
  providers: [AuthGuard, AdminGuard, LoggedInGuard, QuestionsService, UserService],

})
export class TestModule { }
