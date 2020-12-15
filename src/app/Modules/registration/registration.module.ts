import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { LoggedInGuard } from './../../Guards/LoggedIn.guard';
import { AdminGuard } from './../../Guards/Admin.guard';
import { AuthGuard } from './../../Guards/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Modules */
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

/** Components */
import { LoginComponent } from './component/login/login.component';

/** Routes */
import { RegistrationModuleRoutes } from 'src/app/routes/routes';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    RouterModule.forRoot(RegistrationModuleRoutes),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgxSpinnerModule
  ],
  exports : [
    RouterModule,
    LoginComponent,
  ],
  providers: [AuthGuard, AdminGuard, LoggedInGuard],

})

export class RegistrationModule { }
