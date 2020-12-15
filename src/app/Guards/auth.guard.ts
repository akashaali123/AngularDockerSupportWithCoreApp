import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private routes: Router,
    private authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authenticationService.currentUserValue) {
        // Go to admin Routes
        if (this.authenticationService.currentUserRole === 'SuperAdmin' || this.authenticationService.currentUserRole === 'admin' ) {
          // this.authenticationService.logout();
          // localStorage.setItem('flag', 'true');
          // window.location.reload();
          return false;
        } else if (this.authenticationService.currentUserRole === 'candidate') {
          // Go to User Routes
          return true;
        } else if (this.authenticationService.currentUserRole === 'user') {
          // Go to User Routes
          // localStorage.setItem('flag', 'true');
          // this.authenticationService.logout();
          // window.location.reload();
          return false;
        } else if (this.authenticationService.currentUserRole === 'verifier') {
          // Go to User Routes
          // localStorage.setItem('flag', 'true');
          // this.authenticationService.logout();
          // window.location.reload();
          return false;
        } else if (this.authenticationService.currentUserRole === 'contributor') {
          // Go to User Routes
          // localStorage.setItem('flag', 'true');
          // this.authenticationService.logout();
          // window.location.reload();
          return false;
        } else {
          // localStorage.setItem('flag', 'true');
          // this.authenticationService.logout();
          // window.location.reload();
          return false;
        }
        return true;
      } else {
        return false;
      }
  }
}
