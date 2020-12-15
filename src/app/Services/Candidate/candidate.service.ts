import { environments } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient) { }

  createCandidate(FirstName, LastName, email, CurrentCompany, CategoryId, ExperienceLevelId) {
    return this.http.post<any>(environments.apiUrl + `candidate/create`,
      {FirstName,
        LastName,
        email,
        CurrentCompany,
        CategoryId,
        ExperienceLevelId})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  getallCandidate() {
    return this.http.get<any>(environments.apiUrl + `candidate/getall`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }


  getallCandidateWithcategory() {
    // http://localhost:55377/candidate/getcandidatename
    return this.http.get<any>(environments.apiUrl + `candidate/getcandidatename`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  createtest(CandidateId, numberOfQuestion, time) {
    return this.http.post<any>(environments.apiUrl +
       `candidate/generatetest?candidateId=${CandidateId}&numberOfQuestion=${numberOfQuestion}&time=${time}` , {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }
  deletecandidate(candidateId) {
    return this.http.delete<any>(environments.apiUrl +
      `candidate/delete?id=${candidateId}` , {})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }

  updateCandidate(candidateId,FirstName, LastName, email, CurrentCompany, CategoryId, ExperienceLevelId) {
    return this.http.put<any>(environments.apiUrl + `candidate/update?id=${candidateId}` ,
     {FirstName, LastName, email, CurrentCompany, CategoryId, ExperienceLevelId})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }



  getCandidateById(candidateId) {
    return this.http.get<any>(environments.apiUrl + `candidate/getbyid?id=${candidateId}` , {})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
           }
         return user;
       }));
  }

}
