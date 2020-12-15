import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import 'src/assets/scripts/main.js';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  logout(){
    this.authenticationService.logout();
    window.location.reload();
  }

}
