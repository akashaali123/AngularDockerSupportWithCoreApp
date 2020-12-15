import { RegistrationModule } from './../Modules/registration/registration.module';
import { RouterModule } from '@angular/router';
import { AdminNavbarComponent } from './../Modules/admin/component/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './../Modules/admin/component/admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './../Modules/admin/component/admin-footer/admin-footer.component';
import { AdminBodyComponent } from './../Modules/admin/component/admin-body/admin-body.component';
import { AdminPanelTemplateComponent } from './admin-panel-template/admin-panel-template.component';
import { RegistrationTemplateComponent } from './registration-template/registration-template.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AdminBodyComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminPanelTemplateComponent,
    RegistrationTemplateComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    RouterModule,
    AdminBodyComponent,
    AdminFooterComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    AdminPanelTemplateComponent,
    RegistrationTemplateComponent
  ],
})
export class TemplateModule { }
