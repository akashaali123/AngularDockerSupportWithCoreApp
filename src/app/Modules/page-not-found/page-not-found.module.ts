import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageNotFoundComponent } from './component/page-not-found.component';
import { PagenotFoundModuleRoutes } from 'src/app/routes/routes';

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(PagenotFoundModuleRoutes),
    CommonModule
  ],
  exports : [
    RouterModule
  ],
})
export class PageNotFoundModule { }
