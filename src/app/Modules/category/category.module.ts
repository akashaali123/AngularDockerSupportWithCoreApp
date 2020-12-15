import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { DataTablesModule } from 'angular-datatables';
import { AuthenticationService } from './../../Services/Authentication/authentication.service';
import { AdminGuard } from './../../Guards/Admin.guard';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CandidateModuleRoutes, CategoryModuleRoutes } from 'src/app/routes/routes';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { LoggedInGuard } from 'src/app/Guards/LoggedIn.guard';
import { DatatableCategoryComponent } from './components/datatable-category/datatable-category.component';
import {TableModule} from 'primeng/table';



@NgModule({
  declarations: [
    CreateCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
    DatatableCategoryComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(CategoryModuleRoutes),
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    CommonModule,
    DataTablesModule,
    NgxSpinnerModule

  ],
  exports: [
    RouterModule,
    CreateCategoryComponent,
    EditCategoryComponent,
    ListCategoryComponent,
  ],
  providers: [AuthGuard, AdminGuard, AuthenticationService, LoggedInGuard]
})
export class CategoryModule { }
