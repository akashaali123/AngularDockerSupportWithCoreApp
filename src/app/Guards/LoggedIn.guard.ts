import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , Router } from '@angular/router';
import { AuthenticationService } from '../Services/Authentication/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(
    private routes: Router,
    private authenticationService: AuthenticationService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.authenticationService.currentUserValue) {
        // Go to admin Routes
        if (this.authenticationService.currentUserRole === 'SuperAdmin' ||this.authenticationService.currentUserRole === 'admin') {
          this.routes.navigate(['/admin']);
        } else if (this.authenticationService.currentUserRole === 'candidate') {
          // Go to User Routes
          this.routes.navigate(['/candidate']);
        } else if (this.authenticationService.currentUserRole === 'contributor') {
          // Go to User Routes
          this.routes.navigate(['/contributor']);
        } else if (this.authenticationService.currentUserRole === 'verifier') {
          // Go to User Routes
            this.routes.navigate(['/verifier']);
        } else if (this.authenticationService.currentUserRole === 'user') {
          // Go to User Routes
            this.routes.navigate(['/login']);
          }
        // else {
        //   this.authenticationService.logout();
        //   this.routes.navigateByUrl('/');
        // }
        return false;
      } else {
        return true;
      }
  }

  checkLoggedIn(): boolean {
    return (this.authenticationService.currentUserValue == null);
  }
}
