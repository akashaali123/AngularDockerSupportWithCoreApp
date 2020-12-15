import { AuthenticationService } from './../../Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import 'src/assets/scripts/main.js';

@Component({
  selector: 'app-admin-panel-template',
  templateUrl: './admin-panel-template.component.html'
})
export class AdminPanelTemplateComponent implements OnInit {
  isCollapsed = false;
  userRole = '';
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.userRole = this.authenticationService.currentUserRole
  }
  logout(){
    this.authenticationService.logout();
    window.location.reload();
  }

}
