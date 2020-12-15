import { environments } from './../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './../../_model/User';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public  isAdminSubject: BehaviorSubject<string>;
  public isAdmin = true;
  public isUserAdmin: Observable<string>;
  helper = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    if (localStorage.getItem('role') == null) {
      this.logout();
    }
    if (localStorage.getItem('currentUser')) {
      const decodedToken = this.helper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).jwttoken);
    }
    this.isAdminSubject = new BehaviorSubject<string>( JSON.parse(JSON.stringify(localStorage.getItem('role'))) );
    this.isUserAdmin = this.isAdminSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public get currentUserRole(): string {
    return this.isAdminSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(environments.apiUrl + `user/login`, { username, password })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user.data));
                const decodedToken = this.helper.decodeToken(user.data.jwttoken);
                if (decodedToken.role === 'SuperAdmin') {
                  localStorage.setItem('role', 'SuperAdmin');
                  this.isAdminSubject.next('SuperAdmin');

                } else if (decodedToken.role === 'admin') {
                  localStorage.setItem('role', 'admin');
                  this.isAdminSubject.next('admin');

                } else if (decodedToken.role === 'candidate') {
                  localStorage.setItem('role', 'candidate');
                  this.isAdminSubject.next('candidate');

                } else if (decodedToken.role === 'contributor') {
                  localStorage.setItem('role', 'contributor');
                  this.isAdminSubject.next('contributor');

                } else if (decodedToken.role === 'verifier') {
                  localStorage.setItem('role', 'verifier');
                  this.isAdminSubject.next('verifier');

                } else {
                  this.isAdminSubject.next('user');
                  localStorage.setItem('role', 'user');
                }
                this.currentUserSubject.next(user.data);
            }
          return user;
        }));
  }

  logout() {
    // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('admin');
        localStorage.removeItem('role');
        this.currentUserSubject.next(null);
  }

  forgotpassword(email) {
    // http://localhost:55377/user/forgotpassword
    return this.http.post<any>(environments.apiUrl + `user/forgotpassword`, { email})
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
      if (user.success && user.status === 200) {
        }
      return user;
    }));
  }

  resetpassword(email, token, password, confirmPassword) {
    // http://localhost:55377/user/forgotpassword
    return this.http.post<any>(environments.apiUrl + `resetpassword?email=${email}&token=${token}`, {password, confirmPassword} )
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
      if (user.success && user.status === 200) {
        }
      return user;
    }));
  }

}

