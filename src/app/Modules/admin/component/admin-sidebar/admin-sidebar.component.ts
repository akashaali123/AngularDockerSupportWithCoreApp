import { AuthenticationService } from './../../../../Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import 'src/assets/scripts/main.js';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {

  userRole = '';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.userRole = this.authenticationService.currentUserRole;
  }

}
