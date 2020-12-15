import { environments } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExperienceLevelService {

  constructor(private http: HttpClient) { }

  createExperienceLevel(Name, MinExp, MaxExp) {
    return this.http.post<any>(environments.apiUrl + `experiencelevel/create`, { Name, MinExp, MaxExp })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  updateExperienceLevel(ExpId, Name, MinExp, MaxExp) {
    // http://localhost:55377/experiencelevel/update?id=24
    return this.http.put<any>(environments.apiUrl + `experiencelevel/update?id=${ExpId}`, { Name, MinExp, MaxExp })
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  getExperienceLevelById(ExpId) {
    // http://localhost:55377/experiencelevel/getbyid?id=21
    return this.http.get<any>(environments.apiUrl + `experiencelevel/getbyid?id=${ExpId}`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }

  getallExperienceLevels() {
    return this.http.get<any>(environments.apiUrl + `experiencelevel/getall`, {})
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
          if (user.success && user.status === 200) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
              // console.log('i am the respoone ' , user);
            }
          return user;
        }));
  }



  deleteExperienceLevel(experienceLevelId) {
    return this.http.delete<any>(environments.apiUrl +
      `experiencelevel/delete?id=${experienceLevelId}` , {})
       .pipe(map(user => {
           // login successful if there's a jwt token in the response
         if (user.success && user.status === 200) {
               // store user details and jwt token in local storage to keep user logged in between page refreshes
            //  console.log('i am the respoone ' , user);
           }
         return user;
       }));
  }
}
