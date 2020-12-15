import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const currentUser = this.authenticationService.currentUserValue;
        if (localStorage.getItem('currentUser')) {
          const decodedToken = JSON.parse(localStorage.getItem('currentUser')).jwttoken;
          request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${decodedToken}`
                }
              });
        }


        // return next.handle(request);
        return next.handle(request).pipe( tap(() => {},
          (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
            return;
            }
          }
          this.authenticationService.logout();
          window.location.reload();
        }));
    }
}
