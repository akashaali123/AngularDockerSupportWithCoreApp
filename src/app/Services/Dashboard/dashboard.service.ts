import { environments } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {


  constructor(private http: HttpClient) { }

  getPassCandidatesCount() {
    return this.http.get<any>(environments.apiUrl + `test/passcandidatecount`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  getFailCandidatesCount() {
    return this.http.get<any>(environments.apiUrl + `test/failcandidatecount`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  getTestCount() {
    return this.http.get<any>(environments.apiUrl + `test/testcount`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }


  getUserCount() {
    return this.http.get<any>(environments.apiUrl + `user/noofuser`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  getQuestionCount() {
    return this.http.get<any>(environments.apiUrl + `question/questioncount`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  // http://localhost:55377/candidate/noofcandidate
  getCandidateCount() {
    return this.http.get<any>(environments.apiUrl + `candidate/candidatecount`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  // http://localhost:55377/test/top10per
  getTopTenCandidates() {
    return this.http.get<any>(environments.apiUrl + `test/top10per`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
}
