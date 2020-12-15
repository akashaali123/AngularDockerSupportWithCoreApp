import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { CandidateModuleRoutes, QuestionsModuleRoutes } from 'src/app/routes/routes';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoggedInGuard } from './../../Guards/LoggedIn.guard';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { AdminGuard } from './../../Guards/Admin.guard';
import { AuthGuard } from './../../Guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateQuestionsComponent } from './create-questions/create-questions.component';
import { EditQuestionsComponent } from './edit-questions/edit-questions.component';
import { ListQuestionsComponent } from './list-questions/list-questions.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { DatatableQuestionsComponent } from './datatable-questions/datatable-questions.component';
import {MultiSelectModule} from 'primeng/multiselect';
@NgModule({
  declarations: [CreateQuestionsComponent, EditQuestionsComponent, ListQuestionsComponent, DatatableQuestionsComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(QuestionsModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    DataTablesModule,
    CKEditorModule,
    TableModule,
    NgxSpinnerModule,
    DialogModule,
    MultiSelectModule,
    DropdownModule,
  ],
  exports: [
    RouterModule,
  ],
  providers: [AuthGuard, AdminGuard, AuthenticationService, LoggedInGuard]
})
export class QuestionsModule { }
