import { Router } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './Services/Authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'TestingManagementSystem';
  login = '';


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    ) {
      if (this.authenticationService.currentUser != null) {
        if (this.authenticationService.currentUserRole === 'SuperAdmin' ) {
          this.login = 'SuperAdmin';
          // this.router.navigate(['/admin']);
        } else if (this.authenticationService.currentUserRole === 'admin' ) {
          this.login = 'admin';
          // this.router.navigate(['/admin']);
        } else if (this.authenticationService.currentUserRole === 'candidate') {
          this.login = 'candidate';
          // this.router.navigate(['/candidate']);
        } else if (this.authenticationService.currentUserRole === 'contributor') {
          this.login = 'contributor';
          // this.router.navigate(['/contributor']);
        } else if (this.authenticationService.currentUserRole === 'verifier') {
          this.login = 'verifier';
          // this.router.navigate(['/verifier']);
        } else {
          this.login = 'user';
        }
      }
   }

  ngOnInit() {
    if (this.authenticationService.currentUser != null) {
      // currentUser exist in Localstorage
      if (this.authenticationService.currentUserRole === 'SuperAdmin' || this.authenticationService.currentUserRole === 'admin' ) {
        this.login = 'SuperAdmin';
        // this.router.navigate(['/admin']);
      } else if (this.authenticationService.currentUserRole === 'candidate') {
        this.login = 'candidate';
        // this.router.navigate(['/candidate']);
      } else if (this.authenticationService.currentUserRole === 'contributor') {
        this.login = 'contributor';
        // this.router.navigate(['/contributor']);
      } else if (this.authenticationService.currentUserRole === 'verifier') {
        this.login = 'verifier';
        // this.router.navigate(['/verifier']);
      } else {
        this.login = 'user';
      }
      // currentUser exist in Localstorage
      // this.login = this.authenticationService.currentUserRole;
    } else {
      this.authenticationService.logout();
      window.location.reload();
    }
  }


}
