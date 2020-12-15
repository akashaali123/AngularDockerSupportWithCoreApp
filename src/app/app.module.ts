import { TemplateModule } from './template/template.module';
import { IndexComponent } from './Modules/home/component/index/index.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DashboardService } from './Services/Dashboard/dashboard.service';
import { QuestionsService } from 'src/app/Services/Questions/questions.service';
import { JwtInterceptor } from './_helper/jwt.interceptor';
import { LoggedInGuard } from './Guards/LoggedIn.guard';
import { AdminSidebarComponent } from './Modules/admin/component/admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './Modules/admin/component/admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './Modules/admin/component/admin-footer/admin-footer.component';
import { AdminBodyComponent } from './Modules/admin/component/admin-body/admin-body.component';
import { AdminGuard } from './Guards/Admin.guard';
import { AuthGuard } from './Guards/auth.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


/** Component */
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './Modules/page-not-found/component/page-not-found.component';

/** Template */
import { RegistrationTemplateComponent } from './template/registration-template/registration-template.component';
import { AdminPanelTemplateComponent } from './template/admin-panel-template/admin-panel-template.component';

/** Modules */
import { AppRoutingModule } from './app-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    // Add Components here
    AppComponent,
    PageNotFoundComponent,
    // Add Templates in the end
    // RegistrationTemplateComponent,
    // AdminPanelTemplateComponent,
    // Adding Components
    IndexComponent,

  ],
  imports: [
    BrowserModule,
    CKEditorModule,
    BrowserAnimationsModule, // required animations module
    DataTablesModule.forRoot(),
    // ToastrModule.forRoot(), // ToastrModule added
    MatSliderModule,
    HttpClientModule,
    // Import Customized Modules here
    AppRoutingModule,
    ScrollingModule,
    NgxSpinnerModule,
    TemplateModule
    // Store Modules
    // StoreModule.forRoot({
    //   message: simpleReducer,
    //   posts: PostReducer,
    // }),
  ],
  providers: [AuthGuard, AdminGuard, LoggedInGuard,QuestionsService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    DashboardService
  ],
  bootstrap: [AppComponent] // Default template to be shown here
})
export class AppModule { }
